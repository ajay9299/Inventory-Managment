import { getUsersService } from "@/services/user.service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Select from "react-select";
const MenuBar = (loadUser) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [loadUser]);

  /** Fetch users */
  async function getUsers() {
    const apiResponse = await getUsersService();
    if (apiResponse.status === 200) {
      setUsers(apiResponse.data.data);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      color: "black",
    }),
  };

  function loginUser(selectedUser) {
    console.log(selectedUser.value);
    localStorage.setItem("userId", selectedUser.value.userId);
    localStorage.setItem("departmentId", selectedUser.value.departmentId);
  }

  const MySelect = () => (
    <>
      <Select
        options={users?.map((user) => {
          return {
            value: { userId: user._id, departmentId: user.departmentId._id },
            label: user.userName,
          };
        })}
        styles={customStyles}
        placeholder="Select User"
        onChange={loginUser}
      />
    </>
  );
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Link href="/">
            <Navbar.Brand>Inventory Management System</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/">Home</Link>
              <Link href="/raiserequest">Request</Link>
              <Link href="/store">Store</Link>
            </Nav>
            <Nav>
              <MySelect />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MenuBar;
