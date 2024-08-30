import React from "react";

const RouteProtect = (Component, protection) => {
  function Protect() {
    return (
      <div>
        <Component />
      </div>
    );
  }
};

export default RouteProtect;
