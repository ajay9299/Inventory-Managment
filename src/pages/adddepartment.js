import Loader from "@/components/Loader";
import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import TableComponent from "@/components/Table";
import ModalBox from "@/components/modals/ModalBox";
import {
  createDepartment,
  deleteDepartment,
  getDepartmentsService,
  updateDepartment,
} from "@/services/department.service";
import { getUsersService } from "@/services/user.service";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const AddDepartment = () => {
  const [show, setShow] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");
  const [department, setDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [departmentHeadId, setDepartmentHead] = useState("");
  const [column, setColumn] = useState([
    "S.No.",
    "Department",
    "DepartmentHead",
    "Action",
  ]);
  const [users, setUsers] = useState([]);
  const [tableHeading, setTableHeading] = useState("Registered Departments");
  const [departments, setDepartments] = useState([]);
  const [isLoaderLoading, setLoaderLoading] = useState(false);

  const [selectedDepartmentInfo, setSelectDepartmentInfo] = useState({
    departmentId: "",
    departmentName: "",
    departmentHeadId: "",
  });
  const [userObject, setUserObject] = useState({});

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  /** Fetch users */
  async function getUsers() {
    const apiResponse = await getUsersService();
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

  async function addNewDepartment() {
    try {
      console.log("department", department, "departmentHead", departmentHeadId);
      const postApiResponse = await createDepartment(
        department,
        departmentHeadId
      );

      console.log("<<<>>>", postApiResponse);
      if (postApiResponse.status === 200) {
        toast("Department added successfully...", {
          icon: true,
          type: "success",
        });
      }
      setDepartment("");
      setDepartmentHead("");
      getDepartments();
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete(departmentId) {
    const apiResponse = await deleteDepartment(departmentId);
    if (apiResponse.status === 204) {
      toast("Item deleted successfully", {
        icon: true,
        type: "success",
      });
      getDepartments();
    }
    setShow(false);
  }

  const bodyContent = (
    <>
      <Form.Group>
        <Form.Label>Department Name</Form.Label>
        <Form.Control
          as="input"
          value={selectedDepartmentInfo.departmentName}
          placeholder="Enter the item name"
          onChange={(e) => {
            setSelectDepartmentInfo({
              ...selectedDepartmentInfo,
              departmentName: e.target.value,
            });
          }}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Select Department head</Form.Label>
        <Form.Control
          as="select"
          value={"" || selectedDepartmentInfo.departmentHeadId}
          onChange={(e) => {
            console.log("Event", e);
            setSelectDepartmentInfo({
              ...selectedDepartmentInfo,
              departmentHeadId: e.target.value,
            });
          }}
        >
          <option value="">Select...</option>
          {users.map((user) => {
            return (
              <option value={user._id} name={user.userName} key={user._id}>
                {user.userName}
              </option>
            );
          })}
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

  async function onUpdate(departmentId, departmentName, departmentHeadId) {
    setShow(true);
    setSelectDepartmentInfo({ departmentId, departmentName, departmentHeadId });
  }

  async function handleUpdate(departmentId, departmentName, departmentHeadId) {
    console.log(departmentId, departmentName, departmentHeadId);
    const apiResponse = await updateDepartment(
      departmentId,
      departmentName,
      departmentHeadId
    );
    if (apiResponse.status === 200) {
      toast("Item updated successfully");
      getDepartments();
    }
    setShow(false);
  }

  /** Table body*/
  let tableBody = departments?.map((department, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{department.departmentName}</td>
      <td>{department.info ? department.info.userName : null}</td>

      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 400, hide: 400 }}
          overlay={renderTooltip("Edit")}
        >
          <Button
            variant="primary"
            onClick={() => {
              onUpdate(
                department._id,
                department.departmentName,
                department.info ? department.info._id : null
              );
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
              onUpdate(
                department._id,
                department.departmentName,
                department.departmentHeadId
              );
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

  /** Fetch items */
  async function getDepartments() {
    const apiResponse = await getDepartmentsService();

    console.log("apiResponse", apiResponse);

    if (apiResponse.status === 200) {
      setDepartments(apiResponse.data.data);
    }
  }

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <>
      <MenuBar loadUser={userObject} />
      {!isLoaderLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
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
                    selectedDepartmentInfo.departmentId,
                    selectedDepartmentInfo.departmentName,
                    selectedDepartmentInfo.departmentHeadId
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
          <PageHeading pageHeading={"Add New Department"} />
          <Container style={{ width: "80%" }}>
            <Form>
              <Form.Group style={{ marginBottom: "10px" }}>
                <Form.Label>Department name</Form.Label>
                <Form.Control
                  as="input"
                  value={department}
                  placeholder="Enter department name"
                  onChange={(e) => setDepartment(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Select Department head</Form.Label>
                <Form.Control
                  as="select"
                  value={departmentHeadId}
                  onChange={(e) => {
                    console.log("Event", e);
                    setDepartmentHead(e.target.value);
                  }}
                >
                  <option value="">Select...</option>
                  {users.map((user) => {
                    return (
                      <option
                        value={user._id}
                        name={user.userName}
                        key={user._id}
                      >
                        {user.userName}
                      </option>
                    );
                  })}
                  {/* Add username options */}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <div style={{ marginTop: "10px" }}>
                  <Button
                    variant="secondary"
                    onClick={() => addNewDepartment()}
                  >
                    Add Department
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
      )}
    </>
  );
};

export default AddDepartment;
