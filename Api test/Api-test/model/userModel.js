const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  mobileNumber: { type: Number, require: true },
  address: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  status: { type: String, enum: ["ACTIVE", "BLOCK", "DELETE"], default: "ACTIVE" },
  userType: { type: String, enum: ["USER", "ADMIN"], default: "USER" }
},
  { timestamps: true }  
);

const userModel = mongoose.model("user", userSchema)
module.exports = userModel;

 userModel.findOne({ status: { $ne: "DELETE" }, userType: "ADMIN" }, (userErr, userRes) => {
  if (userErr) {
    console.log("Admin not found");
  }
  else if (userRes) {
    console.log("Admin already exist");
  }
  else {
    let admin = {
      firstName: "Kanhaiya",
      lastName:"Sharma",
      mobileNumber: "1234567890",
      address:"Bharat Colony Old Faridabad",
      email: "admin@mailinator.com",
      password: bcryptjs.hashSync("admin"),
      userType: "ADMIN"
    }
    userModel(admin).save((saveErr, saveRes) => {
      if (saveErr) {
        console.log("You are not admin", saveErr);
      }
      else {
        console.log("Admin created successfully");
      }
    })
  }
})


