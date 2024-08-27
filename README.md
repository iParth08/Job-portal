# Job-portal

---

## Description

**Job Hunt Portal: Connecting Recruiters and Job Seekers**

Welcome to our _Job Hunt Portal_, where finding the perfect job match is made seamless and efficient. Designed for both recruiters and job seekers, this platform offers intuitive features tailored to streamline the hiring process.

**For Recruiters:**
Recruiters have the ability to create company profiles and post job openings with detailed descriptions. They can specify job titles, positions, required qualifications, responsibilities, and other pertinent details. Each job posting is tailored to attract the ideal candidates. Recruiters can manage applications received for each job, reviewing applicant profiles and details effortlessly.

**For Job Seekers (Finders):**
Job seekers, referred to as Finders on our platform, can create comprehensive profiles showcasing their skills, experience, education, and professional aspirations. They can browse through a variety of job listings posted by recruiters across different industries and locations. Finders can apply to job openings directly through the platform, ensuring their details are readily accessible to recruiters.

**Application Process:**
Once a job seeker applies for a position, recruiters receive notifications and can review applicant profiles. Recruiters have the option to accept or reject applications based on their suitability for the role. This interactive process ensures efficient communication between recruiters and job seekers, facilitating quicker hiring decisions.

## Key Features:

- **Company Profiles:** Recruiters can create detailed company profiles to showcase their organization’s culture, values, and benefits.
- **Job Postings:** Comprehensive job posting capabilities, allowing recruiters to specify job requirements and expectations clearly.
- **Applicant Management:** Efficient tools for managing applications, including sorting, filtering, and reviewing applicant details.
- **Notifications:** Real-time notifications for both recruiters and job seekers on application status updates and new job postings.
- **User Profiles:** Detailed profiles for job seekers to highlight their skills and experiences, aiding recruiters in making informed decisions.

**Join Us Today:**
Whether you're a recruiter searching for top talent or a job seeker exploring new career opportunities, our Job Hunt Portal provides the tools and resources you need for successful hiring and job hunting. Join our community and discover your next career move with ease!

## Technology Used

1. [ReactJS](https://reactjs.org/)
2. [MongoDB](https://www.mongodb.com/)
3. [ExpressJS](https://expressjs.com/)
4. [Mongoose](https://mongoosejs.com/)

### Dependencies

> **Used in the Backend:**

1. [bcryptjs](https://www.npmjs.com/package/bcryptjs)
2. [cookie-parser](https://www.npmjs.com/package/cookie-parser)
3. [cors](https://www.npmjs.com/package/cors)
4. [dotenv](https://www.npmjs.com/package/dotenv)
5. [express](https://www.npmjs.com/package/express)
6. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
7. [mongoose](https://www.npmjs.com/package/mongoose)
8. [nodemon](https://www.npmjs.com/package/nodemon)
9.

> **Used in the Frontend:**

## Go through Resources

> [!NOTE]
>
> ### Status Code Used
>
> - 200 - Success
> - 201 - Created
> - 400 - Bad Request/Data Error/Empty Data
> - 401 - Unauthorized
> - 404 - Not Found

## Challenges

1.  Using Shadcn UI with React and Javascript and not with (Next.js & Typescript)

         - make `tsconfig.json` file as `jsconfig.json`
         - copy paste the code in `vite.config.js` file
         - provide global.css path to your own `src/index.css` file

2.  Custom tailwind config with tailwind.config.js

        - used **@apply** to create custom tailwind classes in _index.css_
        - customized **tailwind.config.js** to modify the default tailwind configuration
        - created a **styles.js** file for handling common styles that i may alter later for responsive design
