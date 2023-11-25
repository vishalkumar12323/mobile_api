import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./utils/db.js";
import { router } from "./routes/router.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/mobile-api/mobiles", router);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const start = async () => {
  await connectDB(process.env.URI);
  app.listen(port, () => {
    console.log(`Listening On Port ${port}`);
  });
};

start();
