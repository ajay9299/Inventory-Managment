import Loader from "@/components/Loader";
import MenuBar from "@/components/MenuBar";
import TableComponent from "@/components/Table";
import ModalBox from "@/components/modals/ModalBox";
import {
  getRequestHistory,
  getRequestInfoById,
} from "@/services/request.service";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";

const Request = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userObject, setUserObject] = useState({});
  const [isLoaderLoading, setLoaderLoading] = useState(false);
  const [departmentChange, setDepartmentChange] = useState("");
  const [column, setColumn] = useState([
    "S.No.",
    "Total Requested Item",
    "CreatedAt",
    "Action",
  ]);
  const [tableHeading, setTableHeading] = useState("Request History");
  const [requests, setRequests] = useState([]);
  const [buttonClicked, setButtonClicked] = useState("");
  const [requestByIdInfo, setRequestByIdInfo] = useState([]);

  useEffect(() => {
    console.log("?????????????????");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const departmentId = JSON.parse(localStorage.getItem("departmentId"));
    setUserObject({
      value: userId,
      label: userName,
      departmentId: departmentId,
    });
  }, [departmentChange]);

  async function getRequestHistoryFunction() {
    const userId = localStorage.getItem("userId");
    const departmentId = JSON.parse(localStorage.getItem("departmentId"))._id;
    const apiResponse = await getRequestHistory({ userId, departmentId });
    if (apiResponse.status === 200) {
      if (!apiResponse.data.data?.documents) {
        setRequests([]);
        setLoaderLoading(true);
        return;
      }
      setLoaderLoading(true);
      setRequests(apiResponse.data.data.documents);
    }
  }

  // getRequestHistory;
  useEffect(() => {
    getRequestHistoryFunction();
  }, []);

  /** Load department*/
  function loadDepartment(department) {
    setDepartmentChange(department);
    setLoaderLoading(false);
    getRequestHistoryFunction();
  }

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  async function getRequestByIdFunction(requestId) {
    console.log("<object>", requestId);
    const apiResponse = await getRequestInfoById(requestId);
    if (apiResponse.status === 200) {
      console.log("..................", apiResponse.data.data.itemInfo);
      setRequestByIdInfo(apiResponse.data.data.itemInfo);
    }
  }

  let tableBody = requests?.map((request, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{request.requiredQuantity}</td>
      <td>
        {new Date(request.createdAt).toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>

      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 400, hide: 400 }}
          overlay={renderTooltip("Info")}
        >
          <Button
            variant="info"
            onClick={() => {
              setButtonClicked("info");
            }}
          >
            <span
              class="material-symbols-outlined"
              onClick={() => {
                setShow(true);
                getRequestByIdFunction(request._id);
              }}
            >
              visibility
            </span>
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  ));

  console.log("requestedByInfo---------------", requestByIdInfo);

  const modelBody = (
    <Table striped bordered hover style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <td>S.No.</td>
          <td>Item Name</td>
          <td>Requested Quantity</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {requestByIdInfo?.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.itemId.itemName}</td>
            <td>{item.requiredQuantity}</td>
            <td
              style={{
                color: `${item.status}` === "pending" ? "red" : "green",
              }}
            >
              {item.status}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <>
      <MenuBar loadUser={userObject} loadDepartment={loadDepartment} />
      {!isLoaderLoading ? (
        <Loader />
      ) : (
        <>
          <ModalBox
            disabled={isLoading}
            isOpen={show}
            title="Request Info"
            secondaryAction={() => setShow(false)}
            onClose={() => setShow(false)}
            body={modelBody}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "10px",
            }}
          >
            <Link href="/raiserequest">
              <Button
                variant="success"
                onClick={() => {}}
                className="btn btn-primary me-md-2 mt-4"
              >
                Add new request
              </Button>
            </Link>
          </div>
          <hr />
          <Container style={{ width: "80%" }}>
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

export default Request;
