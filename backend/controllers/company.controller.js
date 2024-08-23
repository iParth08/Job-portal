import { Company } from "../model/company.model.js";

//Register a new company
//Method : POST
//Path : /api/v1/company/register
//Task : Create new company in database
//! ONLY RECRUITER ?
export const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;

    //if void
    if (!name) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    //find if exists
    let company = await Company.findOne({ name });
    if (company) {
      return res
        .status(400)
        .json({ message: "The company already exists", success: false });
    }

    //create new company
    company = await Company.create({
      name,
      created_by: req.id,
    });

    //ALL GOOD
    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "registerCompany",
      success: false,
    });
  }
};

// Get companies by a User
// Method : GET
// Path : /api/v1/company/get-companies
// Task : Get companies by a user
export const getCompaniesByUser = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ created_by: userId });

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    //ALL GOOD
    return res.status(200).json({
      message: "All companies",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "getCompaniesByUser",
      success: false,
    });
  }
};

//Get company by id
//Method : GET
//Path : /api/v1/company/get-companies/:id
//Task : Get company by id
export const getCompanyById = async (req, res) => {
  try {
    const id = req.params.id;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    //ALL GOOD
    return res.status(200).json({
      message: "Company found",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "getCompanyById",
      success: false,
    });
  }
};

// Update company
// Method : PUT
// Path : /api/v1/company/update-company/:id
// Task : Update company
export const updateCompany = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, website, location } = req.body;
    const file = req.file;

    //? Cloudinary code here.......

    const company = await Company.findByIdAndUpdate(
      id,
      {
        name,
        description,
        website,
        location,
      },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    //ALL GOOD
    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "updateCompany",
      success: false,
    });
  }
};

// !DELETE COMPANY ?
//Get all companies
//Method : GET
//Path : /api/v1/company
//Task : Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    return res.status(200).json({
      message: "All companies",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "getAllCompanies",
      success: false,
    });
  }
};
