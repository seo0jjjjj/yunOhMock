import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  // 승패
  record: {
    type: [Number],
    default: [0, 0, 0]
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  imgURL: {
    type: String,
    default: ""
  }
},
  { timestamps: true }
);

export default mongoose.model('User', UserSchema)
