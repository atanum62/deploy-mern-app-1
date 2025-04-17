
const express = require('express')
const app = express()
require("dotenv").config();
const cors = require("cors");
const AuthRouter = require("./Routers/AuthRouter");
const ProductRouter=require("./Routers/ProductRouter")

app.use(cors());
app.use(express.json());

const port = process.env.PORT||8080;
require("./Models/db");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})