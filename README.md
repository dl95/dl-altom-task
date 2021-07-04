# passport-local

# Assignment of Altom

Installation process

1. Clone Repo
2. Run command "npm install" or "npm update"
3. Configure data base edit file "config/db.js". Put the details of your database
   1. username t
      his is your database user name
   2. secrete
      this is key generate from your password
   3. collection
      this is your databse

API Requests

Import API collection in your postman using "https://www.getpostman.com/collections/e6b702590e7418539789"
In this postman collection 3 folders

1.  Admin Routes
2.  Worker Routes
3.  Auth Routes

    1.  Auth Routes folder

        1. Login request

        this is for login. admin and worker both can you this request for login
        pass the parameter in body using JSON Like
        {
        "email":"email",
        "password":"password"
        }
        response from this api:
        success messgae
        token (token is Bearer for authentication)

        2. admin signup

        this is for registration of admin.
        pass the parameter in body using JSON Like
        {
        "email":"email",
        "password":"password"
        "name":"name"
        }

        3. admin signup

        this is for registration of Worker same like admin.
        pass the parameter in body using JSON Like
        {
        "email":"email",
        "password":"password"
        "name":"name"
        }

    2.  Admin Folder
        first you authenticate the admin api using login token
        process to update token is

        1. Right click on Admin folder
        2. choose authentication type Bearer Token
        3. Put the login token here
           all request must be inherit auth from parent

        Admin Requests are as follows

        1.  Porfile
            Get the login user Details
        2.  Worker List
            This is for List of Workers
        3.  Create Job For Worker
            This is for to create job for worker
            parameters are
            {
            "task":"test job",
            "worker_id":"worker_id"
            }
        4.  All Jobs
            this is for fetch all the jobs

                All Jobs by status pass end points

                a. /pending for pending jobs
                b. /in-progress for in-process jobs
                c. /complete for complete jobs

        5.  All In progress Jobs
            To get all the process jobs

        6.  All Pending Jobs
            To get all the process jobs

        7.  All Complete Jobs
            To get all the process jobs
        8.  Worker Jobs
            This request for fetch the jobs by worker(worker_id)

    3.  Worker Requests are as follows

        1. Porfile
           Get the login user Details

        2. All Jobs
           this is for fetch all the jobs of logged in worker

        All Jobs of worker by status pass end points

        a. /pending for pending jobs
        b. /in-progress for in-process jobs
        c. /complete for complete jobs

        3.  All In progress Jobs
            To get all the process jobs of logged in worker

        4.  All Pending Jobs
            To get all the process jobs of logged in worker

        5.  All Complete Jobs
            To get all the process jobs of logged in worker

        6.  Start Job
            This is for to change the job status in-progress;
        7.  Complete Job
            This is for to change the job status complete;
