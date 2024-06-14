import User from "../models/mysqlModels/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import { validateGoogleToken } from "../utils/googleService.js";
import Config from "../config/config.js";

export const session = (req, res, next) => {
  try {
    console.log("request arrived");
    res.status(200).send("session created");
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  const { password, ...rest } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...rest,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({ message: "회원가입에 성공하였습니다. " });
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    // check user is exist
    if (!user) return next(createError(404, "존재하지 않는 사용자입니다. 회원가입을 진행해주세요."));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // check password is correct
    if (!isPasswordCorrect)
      return next(createError(400, "비밀번호가 일치하지 않습니다."));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      Config.get("JWT")
    );

    req.session.currentUser = ({ id: user._id });

    res
      .cookie("access_token", token, {
        httpOnly: false,
      })
      .status(200)
      .json(user);
  } catch (err) {
    next(err);
  }
};


export const logout = async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: false,
    secure: Config.get("NODE_ENV") === "production",
    sameSite: "strict",
    /*
        secure : process.env.NODE_ENV === "production",
        path : "/",
        sameSite : 'strict',
    */
  }).status(200).json({ message: "Logged out successfully" });
};


export const loginViaGoogle = async (req, res, next) => {
  console.log("loginViaGoogle called " + req.body.code);
  const { code } = req.body;
  if (!code) {
    next(createError(400, "구글 로그인 인증을 위한 코드가 없습니다."));
    return;
  }

  try {
    const accessToken = await validateGoogleToken(code);
    const getGoogleUserinfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);


    res.status(200).json(getGoogleUserinfo.data);

  } catch (err) {
    console.log(err?.response?.data);
    next(err);
  }

};


export const checkUsernameDuplication = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    res.status(200).json({ available: !user });
  } catch (err) {
    next(err);
  }
}