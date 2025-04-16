const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: "User already exists. Please login.", 
                success: false 
            });
        }
        const newUser = new userModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({ 
            message: "Signup successful", 
            success: true 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const errorMsg = "Authentication failed: Invalid email or password.";
        if (!user) {
            return res.status(401).json({ 
                message: errorMsg, 
                success: false 
            });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ 
                message: errorMsg, 
                success: false 
            });
        }
        const token = jwt.sign(
            { _id: user._id }, // Minimal payload
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );
        res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            email: user.email,
            name: user.name
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Internal server error", 
            success: false 
        });
    }
};

module.exports = { signup, login };


// const userModel = require("../Models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");


// const signup = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const user = await userModel.findOne({ email });
//         if (user) {
//             return res.status(409).json({message:"user is already exist,you can login",scuess:false})
//         }
//         const userModel = new userModel({ name, email, password });
//         userModel.password = await bcrypt.hash(password, 10);
//         await userModel.save();
//         res.status(201)
//             .json({
//                 message: "Signup scuessfully",
//                 scuess:true
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "internal server error",
//             scuess:false
//         })
//     }
// }



// const login = async (req, res) => {
//     try {
//         const {email, password } = req.body;
//         const user = await userModel.findOne({ email });
//         const errmsg = "Auth failed email or password is worng";
//         if (!user) {
//             return res.status(403).json({message:errmsg,scuess:false})
//         }
//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             return res.status(403).json({message:errmsg,scuess:false})
//         }
//         const jwtToken = jwt.sign({ email: user.email, _id: user._id },
//             process.env.JWT_SECRET,
//             {expiresIn:"24h"}
//         )
//         res.status(200)
//             .json({
//                 message: "login scuess",
//                 scuess: true,
//                 jwtToken,email,name:user.name
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "internal server error",
//             scuess:false
//         })
//     }
// }
// module.exports = {
//     signup,
//     login
// }