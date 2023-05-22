import Link from "next/link";
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
          <Link href="/">Home</Link>
          <Link href="/raiserequest">Raise Request</Link>
          {/* <Link href="/adddepartment">Add Department</Link>
          <Link href="/adduser">Add User</Link>
          <Link href="/adddepartmenthead">Add Department Head</Link> */}
          <Link href="/store">Store</Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default MenuBar;
