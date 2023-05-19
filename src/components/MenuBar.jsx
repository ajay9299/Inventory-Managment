import React from "react";
import { Nav, Navbar } from "react-bootstrap";
const MenuBar = () => {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        style={{ justifyContent: "space-between", width: "100%" }}
      >
        <Navbar.Brand style={{ fontSize: "25px", paddingLeft: "30px" }}>
          Inventory Management System
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/" style={{ fontSize: "20px", paddingRight: "20px" }}>
            Home
          </Nav.Link>
          <Nav.Link
            href="/raiserequest"
            style={{ fontSize: "20px", paddingRight: "20px" }}
          >
            Raise Request
          </Nav.Link>
          <Nav.Link
            href="#my-requests"
            style={{ fontSize: "20px", paddingRight: "20px" }}
          >
            My Requests
          </Nav.Link>
          <Nav.Link
            href="#my-profile"
            style={{ fontSize: "20px", paddingRight: "20px" }}
          >
            My Profile
          </Nav.Link>
          <Nav.Link
            href="/adddepartment"
            style={{ fontSize: "20px", paddingRight: "20px" }}
          >
            Add Department
          </Nav.Link>
          <Nav.Link
            href="/adduser"
            style={{ fontSize: "20px", paddingRight: "20px" }}
          >
            Add User
          </Nav.Link>
          <Nav.Link href="/adddepartmenthead" style={{ fontSize: "20px", paddingRight: "20px" }}>
            Add Department Head
          </Nav.Link>
          <Nav.Link
            href="/store"
            style={{ fontSize: "20px", paddingRight: "20px" }}
          >
            Store
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default MenuBar;
