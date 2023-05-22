import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import TableComponent from "@/components/Table";
import {
  createItem,
  deleteItem,
  getItemsService,
} from "@/services/item.service";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
const Store = () => {
  const [itemName, setItemName] = useState("");
  const [column, setColumn] = useState(["S.No.", "Item-name", "Action"]);
  const [tableHeading, setTableHeading] = useState("Registered Items");
  const [items, setItems] = useState([]);

  async function addNewItem() {
    try {
      console.log(itemName);
      const apiResponse = await createItem(itemName);
      if (apiResponse.status === 200) {
        toast("Item added successfully");
        getItems();
      }

      setItemName("");
    } catch (error) {
      alert(error);
    }
  }

  async function onDelete(itemId) {
    const apiResponse = await deleteItem(itemId);
    if (apiResponse.status === 204) {
      toast("Item deleted successfully");
      getItems();
    }
  }

  let tableBody = items?.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.itemName}</td>
      <td>
        <Button variant="primary" onClick={() => onUpdate(item._id)}>
          <span className="material-symbols-outlined">edit</span>
        </Button>{" "}
        <Button variant="danger" onClick={() => onDelete(item._id)}>
          <span className="material-symbols-outlined">delete</span>
        </Button>{" "}
        <Button variant="info" onClick={() => onInfo(item.id)}>
          <span className="material-symbols-outlined">info</span>
        </Button>
      </td>
    </tr>
  ));

  /** Fetch items */
  async function getItems() {
    const apiResponse = await getItemsService();
    if (apiResponse.status === 200) {
      setItems(apiResponse.data.data);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <MenuBar />
      <ToastContainer />
      <PageHeading pageHeading={"Items and history"} />
      <Container style={{ width: "80%" }}>
        <Form>
          <Form.Group>
            <Form.Label>Item name</Form.Label>
            <Form.Control
              as="input"
              value={itemName}
              placeholder="Enter the item name"
              onChange={(e) => setItemName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Button
              variant="primary"
              style={{ marginTop: "10px" }}
              onClick={addNewItem}
            >
              Add Item
            </Button>
          </Form.Group>
        </Form>
        <TableComponent
          tableHeading={tableHeading}
          column={column}
          items={items}
          tableBody={tableBody}
        />
      </Container>
    </>
  );
};

export default Store;
