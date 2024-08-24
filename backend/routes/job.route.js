import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAllJobs,
  getJobById,
  getJobsByAdmin,
  postJob,
  updateJob,
} from "../controllers/job.cotroller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get-all").get(isAuthenticated, getAllJobs);
router.route("/getbyid/:id").get(isAuthenticated, getJobById);
router.route("/getbyadmins").get(isAuthenticated, getJobsByAdmin);
router.route("/update/:id").put(isAuthenticated, updateJob);

export default router;
