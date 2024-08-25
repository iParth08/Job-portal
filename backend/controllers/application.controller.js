import { Application } from "../model/application.model.js";
import { Job } from "../model/job.model.js";

// Apply new application
// Method : POST
// Path : /api/v1/application/apply/:id
// Task : Apply new application
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params;

    // job id not found
    if (!jobId) {
      return res.status(400).json({
        message: "Job id not found",
        success: false,
      });
    }

    //check if already applied or not
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied for this job",
        success: false,
      });
    }

    // if job not available
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      status: "applied",
    });

    job.applications.push(newApplication._id);
    await job.save();

    //ALL GOOD
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
      application: newApplication,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "applyJob",
      success: false,
    });
  }
};

// Get all applications for applicant
// Method : GET
// Path : /api/v1/application/applied
// Task : Get all applications with status
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const appliedJobs = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: {
          sort: { createdAt: -1 },
          populate: { path: "company", options: { sort: { createdAt: -1 } } },
        },
      });

    //no jobs applied
    if (!appliedJobs) {
      return res.status(404).json({
        message: "No jobs applied",
        success: false,
      });
    }

    //ALL GOOD
    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      appliedJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "getAppliedJobs",
      success: false,
    });
  }
};

//Get applicants for Recruiter
//Method : GET
//Path : /api/v1/application/:id/applicants
//Task : Get all applicants for the job posted by admin
export const getApplicants = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const appliedForJobs = await Job.findById(jobId)
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "applications",
        options: {
          sort: { createdAt: -1 },
          populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
        },
      });

    //no jobs applied
    if (!appliedForJobs) {
      return res.status(404).json({
        message: "No jobs applied",
        success: false,
      });
    }

    //ALL GOOD
    return res.status(200).json({
      message: "Applicants fetched successfully",
      success: true,
      appliedForJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "getApplicants",
      success: false,
    });
  }
};

// Update application status by recruiter
// Method : PUT
// Path : /api/v1/application/status/:id/update
// Task : Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id: applicationId } = req.params;
    const { status } = req.body;

    // status not found
    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      { _id: applicationId },
      { status: status.toLowerCase() },
      { new: true }
    );

    // application not found
    if (!updatedApplication) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    //ALL GOOD
    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
      updatedApplication,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "updateApplicationStatus",
      success: false,
    });
  }
};

//! Delete application by applicant
// Method : DELETE
// Path : /api/v1/application/delete
// Task : Delete application
export const deleteApplication = async (req, res) => {
  try {
    const { applicationId, jobId } = req.body;

    // ids not provided
    if (!applicationId || !jobId) {
      return res.status(400).json({
        message: "Ids not provided",
        success: false,
      });
    }

    // remove application from job application(array)
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const index = job.applications.indexOf(applicationId);
    if (index > -1) {
      job.applications.splice(index, 1);
      await job.save();
    } else {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    const deletedApplication = await Application.findByIdAndDelete(
      applicationId
    );
    if (!deletedApplication) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    //ALL GOOD
    return res.status(200).json({
      message: "Application deleted successfully",
      success: true,
      deletedApplication,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      location: "deleteApplication",
      success: false,
    });
  }
};
