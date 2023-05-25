import { getUsersService } from "@/services/user.service";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Select from "react-select";
const MenuBar = ({ loadUser }) => {
  const [users, setUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});

  useEffect(() => {
    getUsers();
    console.log("<<<<>>>>", loadUser);
    setSelectedOption(loadUser);
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
    console.log("---------", selectedUser);
    localStorage.remove;
    setSelectedOption({
      value: selectedUser.value,
      label: selectedUser.label,
      departmentId: selectedUser.departmentId,
    });
    localStorage.setItem("userId", selectedUser.value);
    localStorage.setItem("userName", selectedUser.label);
    localStorage.setItem(
      "departmentId",
      JSON.stringify(selectedUser.departmentId)
    );
  }

  const MySelect = () => (
    <Select
      options={users?.map((user) => {
        return {
          value: user._id,
          label: user.userName,
          departmentId: user.departmentId,
        };
      })}
      styles={customStyles}
      placeholder="Select User"
      onChange={loginUser}
      defaultValue={selectedOption?.label ? selectedOption : null}
    />
  );
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" style={{}}>
        <Container>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>Inventory Management System</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link
                href="/"
                style={{
                  fontSize: "20px",
                  color: "#fff",
                  padding: "10px",
                  textDecoration: "none",
                }}
              >
                Home
              </Link>
              <Link
                href="/raiserequest"
                style={{
                  fontSize: "20px",
                  color: "#fff",
                  padding: "10px",
                  textDecoration: "none",
                }}
              >
                Request
              </Link>
              <Link
                href="/store"
                style={{
                  fontSize: "20px",
                  color: "#fff",
                  padding: "10px",
                  textDecoration: "none",
                }}
              >
                Store
              </Link>
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
