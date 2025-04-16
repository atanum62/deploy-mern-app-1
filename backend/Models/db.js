const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url)
    .then(() => {
    console.log("mongo db connected scuessfully")
})
    .catch((err) => {
    console.log("mongo db connction error",err)
})