const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  sex: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: true }
},
{
  timestamps:true
}
);

const User = mongoose.model('users', UserSchema);


module.exports = User;
