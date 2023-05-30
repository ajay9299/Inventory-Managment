import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  const [userObject, setUserObject] = useState({});
  const [departmentChange, setDepartmentChange] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const departmentId = JSON.parse(localStorage.getItem("departmentId"));

    setUserObject({
      value: userId,
      label: userName,
      departmentId: departmentId,
    });
  }, [departmentChange]);

  /** Load department*/
  function loadDepartment(department) {
    setDepartmentChange(department);
  }

  return (
    <>
      <MenuBar loadUser={userObject} loadDepartment={loadDepartment} />
      <PageHeading />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
