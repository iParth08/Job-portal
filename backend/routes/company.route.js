import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompaniesByUser,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get-companies").get(isAuthenticated, getCompaniesByUser);
router.route("/get-companies/:id").get(isAuthenticated, getCompanyById);
router.route("/update-company/:id").put(isAuthenticated, updateCompany);

export default router;
