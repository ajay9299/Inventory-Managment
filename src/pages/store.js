import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import { getDropDownByKey } from "@/services/dropdown.service";
import { createItem } from "@/services/item.service";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const Store = () => {
  const [itemName, setItemName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const getDepartments = async () => {
      const apiResponse = await getDropDownByKey("department");
      if (apiResponse.status === 200) {
        console.log(apiResponse.data.data);
        setDepartments(apiResponse.data.data);
      }
    };
    getDepartments();
  }, []);

  async function addNewItem() {
    try {
      console.log(department, itemName);
      const apiResponse = await createItem(itemName, department);
      if (apiResponse.status === 200) {
        alert("New item added successfully...");
      }
      setDepartment("");
      setItemName("");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <MenuBar />
      <PageHeading pageHeading={"Store items and history"} />
      <Container style={{ width: "80%" }}>
        <Form>
          <Form.Group>
            <Form.Label>Item name</Form.Label>
            <Form.Control
              as="input"
              value={itemName}
              placeholder="Enter the item name"
              onChange={(e) => setItemName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>Select Department:</Form.Label>
            <Form.Control
              as="select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select...</option>
              {departments?.map((department) => {
                return (
                  <option value={department._id} key={department._id}>
                    {department.value}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Button
              variant="primary"
              style={{ marginTop: "10px" }}
              onClick={addNewItem}
            >
              Add Item
            </Button>
          </Form.Group>
        </Form>

        <Table striped bordered hover style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Department</th>
              <th>Item</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.department}</td>
                <td>{item.item}</td>
                <td>{item.count}</td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Store;
