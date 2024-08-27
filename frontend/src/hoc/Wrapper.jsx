import React from "react";

const Wrapper = (Component, protection) => {
  function Protect() {
    return (
      <div>
        <Component />
      </div>
    );
  }
};

export default Wrapper;
