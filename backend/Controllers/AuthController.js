const userModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser =await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "user already exists",success: false }
            )
        }
        const newUser = new userModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({success:true})
    } catch (error) {
      res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });

        if (!user) {
           return res.status(401).json({ message:"Authentication failed: Invalid email or password.",success: false }
            )
        }

        const isPassEqual = await bcrypt.compare(password, user.password);//client password === databse password

        if (!isPassEqual) {
              return res.status(401).json({ message:"Authentication failed: Invalid email or password.",success: false }
            )
        }  
             
        const token = jwt.sign({ _id:user._id },
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
        ) 

        res.status(200).json({
            message: "Login successfull",
            success: true,
            token,
            email: user.email,
            name:user.name
        })
        

    } catch (error) {
        res.status(500).json({
            message: "INternal server error",
            success:false
        })
    }
}
    
module.exports = { signup, login }