import express from "express";
import {
  getData,
  getFilterData,
  creatMobileData,
  deleteMobileData,
  updateMobileData,
  replaceMobileData,
} from "../controllers/pathHandlers.js";
const router = express.Router();

router.route("/all").get(getData);
router.route("/filter").get(getFilterData);
router.route("/mobiles").post(creatMobileData);
router.route("/update/:id").patch(updateMobileData);
router.route("/replace/:id").put(replaceMobileData);
router.route("/delete/:id").delete(deleteMobileData);

export { router };
