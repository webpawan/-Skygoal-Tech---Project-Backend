import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
  const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).send({ message: "404 fill the all fields" });
    }

      const userExit = await User.findOne({ email: email });

      if (userExit) {
        return res
          .status(400)
          .json({ message: "404 user already exit in data base" });
      }else{
         const newUser =await User({
           name: name,
           email: email,
           password: password,
         });
         if (newUser) {
           const token = await newUser.genrateToken();
           res.cookie("jwt", token, {
             httpOnly: true,
             secure: true,
           });
           await newUser.save();
           res.status(200).json(newUser);
         } else {
           res.status(400).send({ message: "400  something when token is genrating wrong" });
         }
      }

     
    } catch (error) {
      res.status(400).send({ message: "404 something wrong" });
    }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send({ message: "404 fill the all fields" });
    }

    const loginUser = await User.findOne({ email: email });

    if (loginUser) {
      const isMatch = await bcryptjs.compare(password, loginUser.password);
      if (isMatch) {
        const token = loginUser.genrateToken();
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: true,
        });
        return res.status(200).json(loginUser);
      }else{
         res.status(400).json({"message":"wrong password"});

      }
    } else {
      res.status(400).json("user is not there");
    }
  } catch (error) {
    res.status(400).json("user wrong details", error);
  }
};
