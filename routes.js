const express = require("express");
const UserController = require("./controller/UserController");
const JobController = require("./controller/JobController");
require("./config/passport");
const router = express.Router();
var { checkAuthorization, isAdmin } = require("./middleware/auth");

//        Start  Auth  Routes        //

router.post("/login", UserController.login);
router.post("/signup-admin", UserController.signUp);
router.post("/signup-worker", UserController.signUp);

//        End Auth  Routes        //

//      start Admin Routes      //

router.get("/users", checkAuthorization, isAdmin, UserController.getWorkers); //      Get all user     //
router.post("/jobs", checkAuthorization, isAdmin, JobController.createJob); //      Create  Jobs     //
router.get("/jobs", checkAuthorization, isAdmin, JobController.getJobs); //     Get all user     //
router.get(
  "/jobs/:status",
  checkAuthorization,
  isAdmin,
  JobController.getJobsByStatus
); //      All jobs by Status      //

//          End Admin Routes        //

//          Start worker Routes        //
router.get("/profile", checkAuthorization, UserController.profile);
router.get(
  "/job/:status/:id",
  checkAuthorization,
  JobController.updateJobStatus
); //  update job by status      //

router.get("/worker-jobs", checkAuthorization, JobController.getJobsByWorker); //      get jobs by worker id       //

router.get(
  "/worker-jobs/:status",
  checkAuthorization,
  JobController.workerGetJobByStatus
); //  get job by worker and status      //

//          End Worker Routes        //

module.exports = router;
