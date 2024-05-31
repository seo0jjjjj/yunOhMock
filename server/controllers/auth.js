import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import { validateGoogleToken } from "../utils/googleService.js";

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
    res.status(200).json({ message: "회원가입에 성공하였습니다. "});
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "존재하지 않는 사용자입니다. 회원가입을 진행해주세요."));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "비밀번호가 일치하지 않습니다."));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    // user._doc 실제 데이터만 포함하는 순수 JavaScript 객체
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req,res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite : "strict",
    /*
        secure : process.env.NODE_ENV === "production",
        path : "/",
        sameSite : 'strict',
    */
  }).status(200).json({message: "Logged out successfully"});
};

export const loginViaGoogle = async (req, res, next) => {
  console.log("loginViaGoogle called " + req.body.code);
  const {code} = req.body ;
  if(!code) {
    next(createError(400, "구글 로그인 인증을 위한 코드가 없습니다."));
    return;
  }
  
  try{
    const accessToken = await validateGoogleToken(code);
    const getGoogleUserinfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);


    res.status(200).json(getGoogleUserinfo.data);

  }catch(err){
    console.log(err?.response?.data);
    next(err);
  }

};