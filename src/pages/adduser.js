import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import TableComponent from "@/components/Table";
import ModalBox from "@/components/modals/ModalBox";
import {
  getDepartmentsService,
  getDropDownByKey,
} from "@/services/department.service";
import {
  createUser,
  deleteUser,
  getUsersService,
} from "@/services/user.service";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const AddUser = () => {
  const [show, setShow] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [column, setColumn] = useState([
    "S.No.",
    "Username",
    "Department",
    "Action",
  ]);

  const [tableHeading, setTableHeading] = useState("Registered Users");
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserInfo, setSelectedUserInfo] = useState({
    userName: "",
    department: "",
  });

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

  /** Fetch departments */
  async function getDepartment() {
    const apiResponse = await getDepartmentsService();
    if (apiResponse.status === 200) {
      setDepartments(apiResponse.data.data);
    }
  }
  useEffect(() => {
    getDepartment();
  }, []);

  async function addNewUser() {
    try {
      console.log(userName, department, "user");
      const apiResponse = await createUser(userName, department, "user");
      if (apiResponse.status === 200) {
        alert("New user created successfully...");
      }
      setUserName("");
      setDepartment("");
    } catch (error) {
      alert(error);
    }
  }

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  async function handleDelete(userId) {
    const apiResponse = await deleteUser(userId);
    if (apiResponse.status === 204) {
      toast("User deleted successfully", {
        icon: true,
        type: "success",
      });
      getUsers();
    }
    setShow(false);
  }

  const bodyContent = (
    <>
      <Form.Group>
        <Form.Label>User Name</Form.Label>
        <Form.Control
          as="input"
          value={selectedUserInfo.userName}
          placeholder="Enter the user name"
          onChange={(e) => {
            setSelectedUserInfo({
              ...selectedUserInfo,
              userName: e.target.value,
            });
          }}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Select Department head</Form.Label>
        <Form.Control
          as="select"
          value={"" || selectedUserInfo.department}
          onChange={(e) => {
            console.log("Event", e);
            setSelectedUserInfo({
              ...selectedUserInfo,
              department: e.target.value,
            });
          }}
        >
          <option value="">Select...</option>
          <option value={selectedUserInfo.department}>
            {selectedUserInfo.department}
          </option>
          {/* {users.map((user) => {
                return (
                  <option value={user._id} name={user.userName} key={user._id}>
                    {user.userName}
                  </option>
                );
              })} */}
          {/* Add username options */}
        </Form.Control>
      </Form.Group>
    </>
  );

  const deleteBody = (
    <div>
      <strong>Are you sure ?</strong>
    </div>
  );

  async function onUpdate(userId, department, userName) {
    setShow(true);
    setSelectDepartmentInfo({ userId, department, userName });
  }

  async function handleUpdate(userId, department, userName) {
    // const apiResponse = await updateItem(
    //   departmentId,
    //   departmentName,
    //   departmentHead
    // );
    // if (apiResponse.status === 200) {
    //   toast("Item updated successfully");
    //   getItems();
    // }
    // setShow(false);
  }

  /** Table body*/
  let tableBody = users?.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.userName}</td>
      <td>{user.department}</td>

      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 400, hide: 400 }}
          overlay={renderTooltip("Edit")}
        >
          <Button
            variant="primary"
            onClick={() => {
              onUpdate(user._id, user.departmentName, user.departmentHead);
              setButtonClicked("update");
            }}
            style={{ marginRight: "10px" }}
          >
            <span className="material-symbols-outlined">edit</span>
          </Button>
        </OverlayTrigger>
        {"  "}
        <OverlayTrigger
          placement="top"
          delay={{ show: 400, hide: 400 }}
          overlay={renderTooltip("Delete")}
        >
          <Button
            variant="danger"
            onClick={() => {
              onUpdate(user._id, user.userName, user.department);
              setButtonClicked("delete");
            }}
            style={{ marginRight: "10px" }}
          >
            <span className="material-symbols-outlined">delete</span>
          </Button>
        </OverlayTrigger>{" "}
        <OverlayTrigger
          placement="top"
          delay={{ show: 400, hide: 400 }}
          overlay={renderTooltip("Info")}
        >
          <Button
            variant="info"
            onClick={() => {
              onInfo(department.id);
              setButtonClicked("info");
            }}
          >
            <span class="material-symbols-outlined">visibility</span>
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  ));

  return (
    <>
      <MenuBar />
      <ModalBox
        disabled={isLoading}
        isOpen={show}
        title={
          buttonClicked === "update"
            ? "Edit Department"
            : buttonClicked === "delete"
            ? "Delete Department"
            : "Info"
        }
        actionLabel={
          buttonClicked === "update"
            ? "Update"
            : buttonClicked === "delete"
            ? "Delete"
            : "Info"
        }
        buttonColor={
          buttonClicked === "update"
            ? "btn btn-primary"
            : buttonClicked === "delete"
            ? "btn btn-danger"
            : "btn btn-info"
        }
        secondaryActionLabel="Close"
        secondaryAction={() => setShow(false)}
        onClose={() => setShow(false)}
        onSubmit={() =>
          buttonClicked === "update"
            ? handleUpdate(
                selectedDepartmentInfo.departmentId,
                selectedDepartmentInfo.departmentName,
                departmentHead
              )
            : buttonClicked === "delete"
            ? handleDelete(selectedDepartmentInfo.departmentId)
            : "btn btn-info"
        }
        body={
          buttonClicked === "update"
            ? bodyContent
            : buttonClicked === "delete"
            ? deleteBody
            : "btn btn-info"
        }
      />
      <PageHeading pageHeading={"Add New User"} />
      <Container style={{ width: "80%" }}>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              as="input"
              value={userName}
              placeholder="Enter user name"
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
                    {department.departmentName}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <div style={{ marginTop: "10px" }}>
              <Button variant="secondary" onClick={() => addNewUser()}>
                Add User
              </Button>
            </div>
          </Form.Group>
        </Form>
        <TableComponent
          tableHeading={tableHeading}
          column={column}
          tableBody={tableBody}
        />
      </Container>
    </>
  );
};

export default AddUser;
