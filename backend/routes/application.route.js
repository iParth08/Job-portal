import {
  applyJob,
  deleteApplication,
  getApplicants,
  getAppliedJobs,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import express from "express";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, applyJob);
router.route("/applied").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router
  .route("/status/:id/update")
  .put(isAuthenticated, updateApplicationStatus);
router.route("/delete").delete(isAuthenticated, deleteApplication);

export default router;
