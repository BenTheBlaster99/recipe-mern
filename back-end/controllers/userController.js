const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: "error. user already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      password: hashPassword,
    });
    res.json(user);
  } catch (erorr) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req,res) =>{
    const {username, password} = req.body;
    try{
        //verify if the user already exist
        const userExist = await User.findOne({username});
        if(!userExist){
            return res.status(400).json({message : "invaild user"})
        } 
        const isMatch = await bcrypt.compare(password, userExist.password);
        if(!isMatch){
            return res.status(400).json({message: "invalid password"})
        }
        const token = jwt.sign(
            {id: userExist._id, role: userExist.role},
            "secret-key"
        );
        res.json({token, message: "user logged in and token sent"})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}
module.exports = {register,login}