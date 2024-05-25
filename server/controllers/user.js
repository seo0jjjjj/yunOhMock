import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
  try {
    const imgPath = !req.file ? '' : '/' + req.file.path;
    const {password, img, ...resbody} =  req.body;
    
    console.log("imgPath" + imgPath);
    if(!!imgPath){
      console.log(`imgPath setted : ${imgPath}`);
      resbody.img = `${imgPath}`
    } 

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: resbody},
      { new: true }
    );
    console.log("updated user's img : " + updatedUser.img);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}


export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}


export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}


export const getUsers = async (req, res, next) => {
  console.log("routing start");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
