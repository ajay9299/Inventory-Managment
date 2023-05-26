import MenuBar from "@/components/MenuBar";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Request = () => {
  const router = useRouter();
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
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link href="/raiserequest">
          <Button
            variant="primary"
            onClick={() => {}}
            className="btn btn-primary me-md-2 mt-4"
          >
            Add new request
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Request;
