import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./utils/db.js";
import { router } from "./routes/router.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/mobile-api/mobiles", router);

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Listening On Port ${port}`);
  });
};

start();