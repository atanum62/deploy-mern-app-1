const ensureAuthenticated = require("../Middlewear/Auth");

const Router = require("express").Router();


Router.get("/", ensureAuthenticated, (req, res) => {
    console.log("login user details---", req.user);
    res.status(200).json([
        {
        name: "mobile",
        price:10000
        },
        {
            name: "tv",
        price:50000
    }])
});



module.exports = Router;