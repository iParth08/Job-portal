import React, { useState } from "react";
import { styles } from "@/constants/styles";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(false);
  return (
    <div className="w-full bg-white">
      <div className="flex-between spaced-width h-[60px] mx-auto">
        <div>
          <h1 className={styles.heroHeading}>
            Job
            <span className="text-action-100">Finder</span>
          </h1>
        </div>
        <div className="flex-center gap-12">
          <ul className="flex-center gap-5 max-w-[300px] font-medium">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex gap-4">
              <Link to={"/login"}>
                <Button variant="outline">Login</Button>
              </Link>

              <Link to={"/register"}>
                <Button className={styles.actionBtn}>Register</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className={styles.contentHeading}>
                      Lucifer Morningstar
                    </h4>
                    <p className={styles.descText}>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Quos neque porro, corporis
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex-center">
                  <Button variant="link" className="w-fit gap-2">
                    <User2 />
                    View Profile
                  </Button>

                  <Button variant="destructive" className="w-fit gap-2">
                    <LogOut />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
