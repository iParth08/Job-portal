import React from "react";
import { styles, content } from "@/constants";
import { LatestJobCards } from "@/components";
const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  return (
    <div className={styles.wrapperClass}>
      <div>
        <h1 className={styles.sectionHeading}>
          <span className="text-action-100">{content.jobSecTitle[0]}</span>{" "}
          {content.jobSecTitle[1]}
        </h1>

        <div className="grid grid-cols-3 gap-4 my-5">
          {randomJobs.slice(0, 6).map(() => (
            <LatestJobCards {...content.sampleJobCard} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
