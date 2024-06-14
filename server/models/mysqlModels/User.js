import { pool } from "../../utils/Initializer.js";

class User {
  constructor({_id, username, password, nickname, isAdmin, imgURL}) {
    this._id = _id;
    this.username = username;
    this.password = password;
    this.nickname = nickname;
    this.record = [0,0,0]; // 추후 분리
    this.isAdmin = isAdmin === "admin"; 
    this.imgURL = imgURL; // 추후 분리
  }

  static async findOne({ username }) {
    try {
      const result = await pool.query("SELECT * FROM user WHERE username = ?", [username]);
      const current_user = new User(result[0][0]);
      return current_user;

    }
    catch (err) {
      // not found
      return null;
    }

  };
  
  async save() {
    return pool.query(`
      INSERT INTO 
        user (
        username, 
        password, 
        nickname, 
        isAdmin, 
        imgURL
        )
        VALUES (?, ?, ?, ?, ?)`,
      [
        this.username,
        this.password,
        this.nickname,
        this.isAdmin ? "admin" : "user",
        this.imgURL
      ]);
  
  }

}
export default User;
