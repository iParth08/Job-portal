import { Job } from "../model/job.model.js";

// create new job
// Method : POST
// Path : /api/v1/job/post
// Task : Create new job in database
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      requirements,
      jobType,
      positions,
      companyId,
      experience,
    } = req.body;
    const userId = req.id;

    // Check if void
    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !requirements ||
      !jobType ||
      !positions ||
      !companyId ||
      !experience
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    // Create job
    const job = await Job.create({
      title,
      description,
      location,
      salary: Number(salary),
      requirements: requirements.split(","),
      jobType,
      positions,
      company: companyId,
      experienceLevel: Number(experience),
      created_by: userId,
    });

    // ALL GOOD
    return res.status(201).json({
      message: "Job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, location: "postJob", success: false });
  }
};

//Update job
// Method : PUT
// Path : /api/v1/job/update/:id
// Task : Update job in database
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      salary,
      requirements,
      jobType,
      positions,
      experience,
    } = req.body;
    const userId = req.id;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    if (job.created_by.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // Update job
    job.title = title;
    job.description = description;
    job.location = location;
    job.salary = Number(salary);
    job.requirements = requirements.split(",");
    job.jobType = jobType;
    job.positions = positions;
    job.experienceLevel = Number(experience);
    await job.save();

    // ALL GOOD
    return res
      .status(200)
      .json({ message: "Job updated successfully", success: true, job });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, location: "updateJob", success: false });
  }
};

// get all jobs
// Method : GET
// Path : /api/v1/job/get-all?keyword
// Task : Get all jobs from database
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query);
    if (!jobs)
      return res.status(404).json({ message: "No jobs found", success: false });

    // ALL GOOD
    return res
      .status(200)
      .json({ message: "Jobs fetched successfully", success: true, jobs });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, location: "getJobs", success: false });
  }
};

// get job by id
// Method : GET
// Path : /api/v1/job/getbyid/:id
// Task : Get job by id from database
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job)
      return res.status(404).json({ message: "Job not found", success: false });

    // ALL GOOD
    return res
      .status(200)
      .json({ message: "Job fetched successfully", success: true, job });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message, location: "getJobById", success: false });
  }
};

// fetchjobs by admin
// Method : GET
// Path : /api/v1/job/getbyadmins
// Task : Get all jobs from database
export const getJobsByAdmin = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId });
    if (!jobs)
      return res.status(404).json({ message: "No jobs found", success: false });

    // ALL GOOD
    return res
      .status(200)
      .json({ message: "Jobs fetched successfully", success: true, jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "getJobsByAdmin",
      success: false,
    });
  }
};
