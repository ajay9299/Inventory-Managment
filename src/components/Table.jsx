import React from "react";
import { Pagination, Table } from "react-bootstrap";

const TableComponent = ({
  tableHeading,
  column,
  tableBody,
  paginationBody,
}) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{tableHeading}</h1>
      {tableBody && (
        <>
          <Table striped bordered hover style={{ marginTop: "10px" }}>
            <thead>
              <tr>
                {column.map((column, i) => {
                  return <th key={i}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </Table>
          <Pagination style={{ justifyContent: "center" }}>
            {paginationBody}
          </Pagination>
        </>
      )}
    </>
  );
};

export default TableComponent;
