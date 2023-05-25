import Loader from "@/components/Loader";
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
  updateUserService,
} from "@/services/user.service";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Pagination,
  Tooltip,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const AddUser = () => {
  const [show, setShow] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaderLoading, setLoaderLoading] = useState(false);
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
    userId: "",
    userName: "",
    departmentId: "",
    departmentName: "",
  });
  const [userObject, setUserObject] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(100);

  /** Fetch users */
  async function getUsers(currentPage) {
    const apiResponse = await getUsersService(currentPage);
    if (apiResponse.status === 200) {
      setUsers(apiResponse.data.data);
      setTimeout(() => {
        setLoaderLoading(true);
      }, 1000);
    }
  }
  useEffect(() => {
    getUsers();
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const departmentId = JSON.parse(localStorage.getItem("departmentId"));
    setUserObject({
      value: userId,
      label: userName,
      departmentId: departmentId,
    });
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
      const apiResponse = await createUser(userName, department);
      if (apiResponse.status === 200) {
        toast("New user created successfully", {
          icon: true,
          type: "success",
        });
      }
      setUserName("");
      setDepartment("");
      getUsers(currentPage);
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
      setCurrentPage(currentPage);
      getUsers(currentPage);
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
          value={"" || selectedUserInfo.departmentId}
          onChange={(e) => {
            console.log("Event", e);
            setSelectedUserInfo({
              ...selectedUserInfo,
              departmentId: e.target.value,
            });
          }}
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
    </>
  );

  const deleteBody = (
    <div>
      <strong>Are you sure ?</strong>
    </div>
  );

  async function onUpdate(userId, userName, departmentId) {
    setShow(true);
    console.log({ userId, departmentId, userName });
    setSelectedUserInfo({ userId, departmentId, userName });
  }

  async function handleUpdate(userId, departmentId, userName) {
    const apiResponse = await updateUserService(userId, userName, departmentId);
    if (apiResponse.status === 200) {
      toast("User updated successfully");
      setCurrentPage(currentPage);
      getUsers(currentPage);
    }
    setShow(false);
  }

  /** Table body*/

  console.log("users", users);
  let tableBody = users?.map((user, index) => (
    <tr key={index}>
      <td>{5 * (currentPage - 1) + 1 + index}</td>
      <td>{user.userName}</td>
      <td>{user.departmentId.departmentName}</td>

      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 400, hide: 400 }}
          overlay={renderTooltip("Edit")}
        >
          <Button
            variant="primary"
            onClick={() => {
              onUpdate(user._id, user.userName, user.departmentId._id);
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
              onUpdate(user._id, user.userName, user.departmentId._id);
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
              onUpdate(user._id, user.userName, user.departmentId._id);
              setButtonClicked("info");
            }}
          >
            <span class="material-symbols-outlined">visibility</span>
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  ));

  const handlePageChange = (pageNumber) => {
    console.log("pageNumber", pageNumber);
    setCurrentPage(pageNumber);
    setLoaderLoading(false);
    getUsers(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let pageNumber = 1; pageNumber <= 12; pageNumber++) {
      items.push(
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }
    return items;
  };

  const paginationBody = (
    <>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />
      {renderPaginationItems()}
      <Pagination.Next
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </>
  );

  return (
    <>
      <MenuBar loadUser={userObject} />
      {!isLoaderLoading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
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
                    selectedUserInfo.userId,
                    selectedUserInfo.departmentId,
                    selectedUserInfo.userName
                  )
                : buttonClicked === "delete"
                ? handleDelete(selectedUserInfo.userId)
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
              paginationBody={paginationBody}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default AddUser;
