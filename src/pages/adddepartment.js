import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import { createDropDownByKey } from "@/services/dropdown.service";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const AddDepartment = () => {
  const [department, setDepartment] = useState("");
  const [departmentKey, setDepartmentKey] = useState("department");

  function setDepartmentFunction(departmentName) {
    setDepartment(departmentName);
  }

  async function addNewDepartment() {
    try {
      const postApiResponse = await createDropDownByKey(
        departmentKey,
        department
      );
      if (postApiResponse.status === 200) {
        alert("Department added successfully...");
      }
      setDepartment("");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <MenuBar />
      <PageHeading pageHeading={"Add New Department"} />
      <Container style={{ width: "80%" }}>
        <Form>
          <Form.Group>
            <Form.Label>Department name</Form.Label>
            <Form.Control
              as="input"
              value={department}
              placeholder="Enter department name"
              onChange={(e) => setDepartmentFunction(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <div style={{ marginTop: "10px" }}>
              <Button variant="secondary" onClick={() => addNewDepartment()}>
                Add Department
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddDepartment;
