const { model, Schema } = require("mongoose");
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// json web token
// UserSchema.methods.generateToken = function () {
//   try {
//     return jwt.sign(
//       {
//         userId: this._id.toString(),
//         email: this.email.toString(),
//       },
//       process.env.JWT_SECRETE_KEY,
//       {
//         expiresIn: "10min",
//       }
//     );
//   } catch (error) {
//     console.error(error);
//   }
// }

// Corrected export statement
module.exports = model("user", UserSchema);
