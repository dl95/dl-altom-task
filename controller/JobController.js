const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Job = require("../model/job");

app.use(bodyParser.urlencoded({ extended: true }));

function getJobs(req, res, next) {
  Job.find(function (err, jobs) {
    if (err) {
      console.log("Jobs not found");
      res.status(404).json({
        success: true,
        message: "Something went wrong",
      });
      throw err;
    }
    if (jobs && jobs.length > 0) {
      res.status(200).json({
        success: true,
        jobs: jobs,
      });
    } else {
      console.log("Jobs not found");
      res.status(404).json({
        success: true,
        message: "Jobs not found",
      });
    }
  });
}

function getJobsByWorker(req, res, next) {
  Job.find({ worker_id: req.user._id }, async function (err, jobs) {
    if (err) {
      console.log("Jobs not found");
      res.status(404).json({
        success: true,
        message: "Something went wrong",
      });
      throw err;
    }
    if (jobs && jobs.length > 0) {
      res.status(200).json({
        success: true,
        jobs: jobs,
      });
    } else {
      console.log("Jobs not found");
      res.status(404).json({
        success: true,
        message: "Jobs not found",
      });
    }
  });
}

function getJobById(req, res, next) {
  Job.findOne({ _id: req.params.id }, async function (err, job) {
    if (err) {
      console.log("Job not found");
      res.status(404).json({
        success: true,
        message: "Something went wrong",
      });
      throw err;
    }
    if (job && job.length > 0) {
      res.status(200).json({
        success: true,
        jobs: job,
      });
    } else {
      console.log("Jobs not found");
      res.status(404).json({
        success: true,
        message: "Jobs not found",
      });
    }
  });
}

function workerGetJobByStatus(req, res, next) {
  Job.find(
    { worker_id: req.user._id, status: req.params.status },
    async function (err, job) {
      if (err) {
        console.log("Job not found");
        res.status(404).json({
          success: true,
          message: "Something went wrong",
        });
        throw err;
      }
      if (job && job.length > 0) {
        res.status(200).json({
          success: true,
          jobs: job,
        });
      } else {
        console.log("Jobs not found");
        res.status(404).json({
          success: true,
          message: "Jobs not found",
        });
      }
    }
  );
}

function getJobsByStatus(req, res, next) {
  Job.find({ status: req.params.status }, async function (err, job) {
    if (err) {
      console.log("Job not found");
      res.status(404).json({
        success: true,
        message: "Something went wrong",
      });
      throw err;
    }
    if (job && job.length > 0) {
      res.status(200).json({
        success: true,
        jobs: job,
      });
    } else {
      console.log("Job not found");
      res.status(404).json({
        success: true,
        message: "Job not found",
      });
    }
  });
}

function createJob(req, res, next) {
  var { worker_id, task, assign_date, target_date } = req.body;
  Job.create(
    {
      _id: new mongoose.Types.ObjectId(),
      worker_id: worker_id,
      task: task,
      assign_date: assign_date,
      target_date: target_date,
      status: "pending",
    },
    function (err, job) {
      console.log(err);
      if (!err && job) {
        res.status(201).json({
          success: true,
          message: "successfully job posted",
        });
      } else {
        console.log("could not insert");
        res.status(403).json({
          success: true,
          message: "could not post job",
        });
        throw err;
      }
    }
  );
}

function updateJobStatus(req, res, next) {
  Job.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: req.params.status } },
    function (err, job) {
      if (!err && job) {
        res.status(201).json({
          success: true,
          message: "successfully updated job",
        });
      } else {
        console.log("could not insert");
        res.status(403).json({
          success: true,
          message: "could not updated job",
        });
        throw err;
      }
    }
  );
}

exports.getJobs = getJobs;
exports.getJobsByWorker = getJobsByWorker;
exports.getJobById = getJobById;
exports.createJob = createJob;
exports.updateJobStatus = updateJobStatus;
exports.workerGetJobByStatus = workerGetJobByStatus;
exports.getJobsByStatus = getJobsByStatus;
