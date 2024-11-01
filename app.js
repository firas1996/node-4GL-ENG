const express = require("express");
const fs = require("fs");
const userRouter = require("./routes/userRoutes");
//  na3mlou importation mta3 mongoos ali howa el ODM mte3na (OBJECT DATA MODELING)
// bech nesta3mlouh to create our connection with mongoDB
const mongoose = require("mongoose");
// import dotenv our envirement manager
const dotenv = require("dotenv");
// config to give dotenv from where he can get the variebals
dotenv.config({ path: "./.env" });
// bech nasn3ou beha el connection string mte3na
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
//
mongoose
  .connect(DB)
  .then((aaa) => {
    // console.log(aaa.connections);
    console.log("DB connection secured!!!");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use("/users", userRouter);

const port = 7900;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});

// app.get("/msg", (req, res) => {
//   res.send("This msg is from the server !!!");
// });

let products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
app.get("/products", (req, res) => {
  res.status(200).json({
    message: "Success !!!",
    results: products.length,
    data: {
      products,
    },
  });
});

app.post("/products", (req, res) => {
  console.log(req.body);
  res.send("sss");
});
