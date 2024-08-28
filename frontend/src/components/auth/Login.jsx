import React, { useState } from "react";
import { styles, APIs } from "@/constants";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const changeRoleHandler = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${APIs.USER_API}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // if successful, redirect to login page
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
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
        <h1 className={styles.sectionHeading}>Login</h1>

        <div className="flex-col-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Johnwick@gmail.com"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="flex-col-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="its a secret"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="flex-between gap-2">
          <RadioGroup
            className="flex gap-10"
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
        </div>

        <Button type="submit" className=" mt-5 w-full bg-action-200">
          Login
        </Button>
        <span className={styles.descText}>
          Don't have an account?{" "}
          <Link to={"/register"} className="text-action-100">
            Register here
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
