import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { styles, APIs } from "@/constants";
import axios from "axios";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const changeRoleHandler = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const changeFileHandler = (e) => {
    console.log(e.target.files[0]);
    setFormData({ ...formData, file: e.target?.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("fullname", formData.fullname);
    userData.append("email", formData.email);
    userData.append("phoneNumber", formData.phoneNumber);
    userData.append("password", formData.password);
    userData.append("role", formData.role);
    if (formData.file) {
      userData.append("file", formData.file);
    }

    try {
      const res = await axios.post(`${APIs.USER_API}/register`, userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      // if successful, redirect to login page
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={`${styles.wrapperClass} flex-center`}>
      <form
        action=""
        className={`${styles.formSection} flex-col-2`}
        onSubmit={submitHandler}
      >
        <h1 className={styles.sectionHeading}>Register</h1>
        <div className="flex-col-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            name="fullname"
            placeholder="John Wick"
            onChange={changeHandler}
            value={formData.fullname}
            required
          />
        </div>

        <div className="flex-col-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Johnwick@gmail.com"
            onChange={changeHandler}
            value={formData.email}
            required
          />
        </div>

        <div className="flex-col-1">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="number"
            id="phone"
            name="phoneNumber"
            placeholder="1234567890"
            onChange={changeHandler}
            value={formData.phoneNumber}
            required
          />
        </div>

        <div className="flex-col-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="its a secret"
            onChange={changeHandler}
            value={formData.password}
            required
          />
        </div>

        <div className="flex-between gap-5">
          <RadioGroup
            className="flex gap-5"
            name="role"
            onChange={changeRoleHandler}
          >
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                value="student"
                id="student"
                name="role"
                checked={formData.role === "student"}
                readOnly
              />
              <Label htmlFor="student" className="cursor-pointer">
                Finder
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                value="recruiter"
                id="recruiter"
                name="role"
                checked={formData.role === "recruiter"}
                readOnly
              />
              <Label htmlFor="recruiter" className="cursor-pointer">
                Recruiter
              </Label>
            </div>
          </RadioGroup>

          <div className="flex items-center gap-2">
            <Label htmlFor="profile">Profile</Label>
            <Input
              type="file"
              accept="image/*"
              id="profile"
              className="cursor-pointer"
              name="file"
              onChange={changeFileHandler}
            />
          </div>
        </div>

        <Button type="submit" className=" mt-2 w-full bg-action-200">
          Register
        </Button>
        <span className={styles.descText}>
          Already have an account?{" "}
          <Link to={"/login"} className="text-action-100">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
