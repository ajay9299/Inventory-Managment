import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import TableComponent from "@/components/Table";
import ModalBox from "@/components/modals/ModalBox";
import {
  createItem,
  deleteItem,
  getItemsService,
  updateItem,
} from "@/services/item.service";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
const Store = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [column, setColumn] = useState(["S.No.", "Item-name", "Action"]);
  const [tableHeading, setTableHeading] = useState("Registered Items");
  const [items, setItems] = useState([]);
  const [buttonClicked, setButtonClicked] = useState("");
  const [selectedItemInfo, setSelectItemInfo] = useState({
    itemId: "",
    itemName: "",
  });

  async function addNewItem() {
    try {
      console.log(itemName);
      const apiResponse = await createItem(itemName);
      if (apiResponse.status === 200) {
        toast("Item added successfully", {
          icon: true,
          type: "success",
        });
        getItems();
      }

      setItemName("");
    } catch (error) {
      alert(error);
    }
  }

  async function handleDelete(itemId) {
    console.log(">>>>>>>>>>>>>>>>>>>>.", itemId);
    const apiResponse = await deleteItem(itemId);
    if (apiResponse.status === 204) {
      toast("Item deleted successfully", {
        icon: true,
        type: "success",
      });
      getItems();
    }
    setShow(false);
  }

  const bodyContent = (
    <Form.Group>
      <Form.Label>Item name</Form.Label>
      <Form.Control
        as="input"
        value={selectedItemInfo.itemName}
        placeholder="Enter the item name"
        onChange={(e) => {
          setSelectItemInfo({
            ...selectedItemInfo,
            itemName: e.target.value,
          });
        }}
      ></Form.Control>
    </Form.Group>
  );

  const deleteBody = (
    <div>
      <strong>Are you sure ?</strong>
    </div>
  );

  async function onUpdate(itemId, itemName) {
    setShow(true);
    setSelectItemInfo({ itemId, itemName });
  }

  async function handleUpdate(itemId, itemName) {
    console.log(itemId, itemName);
    const apiResponse = await updateItem(itemId, itemName);
    if (apiResponse.status === 200) {
      toast("Item updated successfully");
      getItems();
    }
    setShow(false);
  }

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  let tableBody = items?.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.itemName}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <OverlayTrigger
          placement="top"
          delay={{ show: 400, hide: 400 }}
          overlay={renderTooltip("Edit")}
        >
          <Button
            variant="primary"
            onClick={() => {
              onUpdate(item._id, item.itemName);
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
              onUpdate(item._id, item.itemName);
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
              onInfo(item.id);
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
      <ModalBox
        disabled={isLoading}
        isOpen={show}
        title={
          buttonClicked === "update"
            ? "Edit Item"
            : buttonClicked === "delete"
            ? "Delete Item"
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
            ? handleUpdate(selectedItemInfo.itemId, selectedItemInfo.itemName)
            : buttonClicked === "delete"
            ? handleDelete(selectedItemInfo.itemId)
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

      <PageHeading pageHeading={"Items and history"} />
      <Container style={{ width: "80%" }}>
        <Form>
          <Form.Group>
            <Form.Label>Item name</Form.Label>
            <Form.Control
              as="input"
              value={itemName}
              placeholder="Enter the item name"
              onChange={(e) => {
                setItemName(e.target.value);
              }}
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
