const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    telefono: {
      type: String,
      required: [true, "Phone number is required"],
    },
    direccion: {
      type: String,
      required: [true, "Address is required"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    descripcion: {
      type: String,
      default: "",
    },
    //campo para admin y user
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    token: {
        type: String,
    },

  },

  { timestamps: true }
);



//si el user no esta confirmado no puede logearse
UserSchema.methods.verifyConfirmed = function () {
  if (!this.confirmed) {
    throw new Error("Please confirm your account first");
  }
  return true;
};

UserSchema.plugin(uniqueValidator, { message: "Email already exists" });
module.exports.UserModel = mongoose.model("User", UserSchema);
