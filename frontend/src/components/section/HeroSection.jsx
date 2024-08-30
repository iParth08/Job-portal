import React from "react";
import { content, styles } from "@/constants";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div className={`${styles.wrapperClass} text-center`}>
      <div className="flex-col-2 items-center">
        <span className="tabclass">{content.tabline}</span>

        <h1 className={styles.heroHeading}>
          {content.tagline[0]} <br /> {content.tagline[1]}
          <span className="text-action-100"> {content.tagline[2]}</span>
        </h1>
        <p className={styles.descText}>{content.tagdesc}</p>

        <div className="flex w-[60%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
          <input
            type="text"
            placeholder="Find your dream job...."
            className="outline-none rounded-md w-full p-2"
          />
          <Button className="bg-action-100 hover:bg-action-200 rounded-r-full">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
