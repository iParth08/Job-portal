import React from "react";
import { styles } from "@/constants";
const SectionWrap = (Component) => {
  function HOC() {
    return (
      <div className={styles.wrapperClass}>
        <Component />
      </div>
    );
  }
};

export default SectionWrap;
