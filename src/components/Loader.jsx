import React from "react";

const Loader = ({isLoaderLoading}) => {
 
  console.log("isLoaderLoading", isLoaderLoading);
  
  return (
    <div className="loader-container" hidden={isLoaderLoading}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
