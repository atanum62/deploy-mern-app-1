const express = require("express");;
const app = express();
require("dotenv").config();
require("./Models/db")

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("hello from backend");
})

app.listen(port, () => {
console.log(`server is running on http://127.0.0.127:${port}`)
})