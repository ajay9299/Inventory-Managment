import Loader from "@/components/Loader";
import MenuBar from "@/components/MenuBar";
import TableComponent from "@/components/Table";
import { getRequestHistory } from "@/services/request.service";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";

const Request = () => {
  const router = useRouter();
  const [userObject, setUserObject] = useState({});
  const [isLoaderLoading, setLoaderLoading] = useState(false);
  const [departmentChange, setDepartmentChange] = useState("");
  const [column, setColumn] = useState([
    "S.No.",
    "Total Requested Item",
    "Status",
    "CreatedAt",
    "Action",
  ]);
  const [tableHeading, setTableHeading] = useState("Request History");
  const [requests, setRequests] = useState([]);
  const [buttonClicked, setButtonClicked] = useState("");
  const [test, setTest] = useState(false);

  useEffect(() => {
    console.log("first useEffect called");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const departmentId = JSON.parse(localStorage.getItem("departmentId"));
    setUserObject({
      value: userId,
      label: userName,
      departmentId: departmentId,
    });
  }, [departmentChange]);

  async function getRequestHistoryFunction(userInfo) {
    const apiResponse = await getRequestHistory(userInfo);
    if (apiResponse.status === 200) {
      if (!apiResponse.data.data?.documents) {
        return;
      }
      setLoaderLoading(true);
      setRequests(apiResponse.data.data.documents);
    }
  }

  // getRequestHistory;
  useEffect(() => {
    console.log("first useEffect called");
    const userId = localStorage.getItem("userId");
    const departmentId = JSON.parse(localStorage.getItem("departmentId"))._id;
    getRequestHistoryFunction({ userId, departmentId });
  }, [departmentChange]);

  /** Load department*/
  function loadDepartment(department) {
    setDepartmentChange(department);
  }

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  let tableBody = requests?.map((request, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{request.requiredQuantity}</td>
      <td
        style={{ color: `${request.status}` === "pending" ? "red" : "green" }}
      >
        {request.status}
      </td>
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
            <span class="material-symbols-outlined">visibility</span>
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  ));

  return (
    <>
      <MenuBar loadUser={userObject} loadDepartment={loadDepartment} />
      {!isLoaderLoading ? (
        <Loader />
      ) : (
        <>
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
