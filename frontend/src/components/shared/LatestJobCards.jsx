import React from "react";
import { Badge } from "../ui/badge";
import { styles } from "@/constants";

const LatestJobCards = ({
  companyName,
  location,
  jobTitle,
  jobDesc,
  positions,
  jobType,
  salary,
}) => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{companyName}</h1>
        <p className={styles.descText}>{location}</p>
      </div>

      <div className="my-2">
        <h1 className="font-bold text-lg">{jobTitle}</h1>
        <p className={styles.descText}>{jobDesc}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <Badge className="badgeBlue" variant="ghost">
          {positions}
        </Badge>
        <Badge className="badgeRed" variant="ghost">
          {jobType}
        </Badge>
        <Badge className="bagdePrime" variant="ghost">
          {salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
