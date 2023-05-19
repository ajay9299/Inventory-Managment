import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import { getDropDownByKey } from "@/services/dropdown.service";
import { createUser } from "@/services/user.service";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const apiResponse = await getDropDownByKey("department");
        if (apiResponse.status === 200) {
          console.log(apiResponse.data.data);
          setDepartments(apiResponse.data.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    getDepartments();
  }, []);

  async function addNewUser() {
    try {
      const apiResponse = await createUser(
        userName,
        department,
        "departmentHead"
      );
      if (apiResponse.status === 200) {
        alert("New departmentHead created successfully...");
      }
      setUserName("");
      setDepartment("");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <MenuBar />
      <PageHeading pageHeading={"Add Department Head"} />
      <Container style={{ width: "80%" }}>
        <Form>
          <Form.Group>
            <Form.Label>Department head username</Form.Label>
            <Form.Control
              as="input"
              value={userName}
              placeholder="Enter department head username"
              onChange={(e) => setUserName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>Department:</Form.Label>
            <Form.Control
              as="select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select...</option>
              {departments.map((department) => {
                return (
                  <option value={department._id} key={department._id}>
                    {department.value}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <div style={{ marginTop: "10px" }}>
              <Button variant="secondary" onClick={() => addNewUser()}>
                Add Department Head
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddUser;
