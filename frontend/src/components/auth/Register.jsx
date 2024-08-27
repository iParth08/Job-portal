import React from "react";
import { styles } from "@/constants/styles";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={`${styles.wrapperClass} flex-center`}>
      <form action="" className={`${styles.formSection} flex-col-2`}>
        <h1 className={styles.sectionHeading}>Register</h1>
        <div className="flex-col-1">
          <Label htmlFor="name">Full Name</Label>
          <Input type="text" id="name" placeholder="John Wick" required />
        </div>

        <div className="flex-col-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Johnwick@gmail.com"
            required
          />
        </div>

        <div className="flex-col-1">
          <Label htmlFor="phone">Phone Number</Label>
          <Input type="number" id="phone" placeholder="1234567890" required />
        </div>

        <div className="flex-col-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="its a secret"
            required
          />
        </div>

        <div className="flex-between gap-2">
          <RadioGroup defaultValue="student" className="flex gap-10">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student" />
              <Label htmlFor="student" className="cursor-pointer">
                Finder
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recruiter" id="recruiter" />
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
