const User = require("../models/user.model");
const bcryptjs=require("bcryptjs")
class usercontroller {
  async createuser(req, res) {
    try {
      const { name, age, email, roll, password, address } = req.body;
     const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });}
        const salt=await bcryptjs.genSalt(10);
         const hsahedpassword = await bcryptjs.hash(password, salt);
      const useritem = new User({
        name,
        age,
        email,
        roll,
        password:hsahedpassword,
        address,
      });
       if (req.file) {
        useritem.image = req.file.path;
      }
      const data=await useritem.save()
      return res.status(202).json({
        message:"User created successfully",
        data:data
      }) 
    } catch (error) {
      return res.status(402).json({
        message: error.message,
      });
    }
  }
}
module.exports = new usercontroller();
