import Loader from "@/components/Loader";
import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import { getItemsService } from "@/services/item.service";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";

const RaiseRequest = () => {
  /** States */
  const [username, setUsername] =
    useState(""); /** Username remain fix for per request.*/
  const [department, setDepartment] =
    useState(""); /** Department remain fix for per request.*/
  const [isLoaderLoading, setLoaderLoading] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [data, setData] = useState([]);
  /**Data contains all data related to items. */
  const [departmentChange, setDepartmentChange] = useState("");
  const [column, setColumn] = useState([
    "S.No.",
    "ItemName",
    "ItemQuantity",
    "Action",
  ]);

  const [items, setItems] = useState([
    { itemName: "", itemCount: 0 },
  ]); /** Items contains all data related to added dynamic items. */

  /** States for api data storages */
  const [products, setProducts] = useState([]);
  const [userObject, setUserObject] = useState({});

  /** Handle dynamic added items state */
  const handleAddItem = () => {
    setItems([...items, { item: "", count: 1 }]);
    for (let i = 0; i < items.length; i++) {
      const { count, item } = items[i];
      console.log({ username, department, item, count });
      //   setData([...data, { username, department, item, count }]);
    }
  };

  /** Load department*/
  function loadDepartment(department) {
    setDepartmentChange(department);
  }

  /** Handle dynamic removed items state */
  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    const updatedData = [...data];
    updatedItems.splice(index, 1);
    updatedData.splice(index, 1);
    setData(updatedData);
    setItems(updatedItems);
  };

  const handleItemChange = (index, item) => {
    const updatedItems = [...items];
    updatedItems[index].item = item;
    setItems(updatedItems);

    if (item && updatedItems[index].item) {
      handleCountChange(index, 1);
    } else if (!item) {
      handleCountChange(index, 0);
    }
  };

  /** Handle the count increment and decrement. */
  const handleCountChange = (index, count) => {
    if (count < 0) {
      alert("Sorry you can't decrease item count...");
      return;
    }
    const updatedItems = [...items];
    updatedItems[index].count = count;
    setItems(updatedItems);
  };

  /** Handle single item add operation that is used to add item in table. */
  const handleAddSingleItem = () => {
    console.log("itemCount-------->", itemCount);
    console.log("itemName-------->", itemName);
    console.log("itemId-------->", itemId);
    console.log("data------------->", data);
    setItems([...items, { itemName, itemCount }]);
  };

  function handleItemId(itemId, itemName) {
    setItemId(itemId);
    setItemName(itemName);
    console.log("<><><><><><><>", itemId, "<><><><><><><>", itemName);
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const departmentId = JSON.parse(localStorage.getItem("departmentId"));
    setUserObject({
      value: userId,
      label: userName,
      departmentId: departmentId,
    });
    getItems();
  }, [departmentChange]);

  /** Fetch items */
  async function getItems(currentPage) {
    const apiResponse = await getItemsService(currentPage);
    if (apiResponse.status === 200) {
      setProducts(apiResponse.data.data);
      setTimeout(() => {
        setLoaderLoading(true);
      }, 1000);
    }
  }

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;
  /** Handle submit request operation */
  const submitRequest = () => {
    setUsername("");
    setDepartment("");
  };

  let tableBody = items?.map((item, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{item.itemName}</td>
      <td>{item.itemCount}</td>

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

  return (
    <>
      <MenuBar loadUser={userObject} loadDepartment={loadDepartment} />
      {!isLoaderLoading ? (
        <Loader />
      ) : (
        <>
          <PageHeading pageHeading={"Raise New Request"} />
          <Container style={{ width: "80%" }}>
            <Form>
              <Form.Group style={{ marginTop: "10px" }}>
                <Form.Label>Department:</Form.Label>
                <Form.Control
                  as="input"
                  value={userObject?.departmentId?.departmentName}
                  disabled
                  onChange={(e) => setDepartment(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group style={{ marginTop: "10px" }}>
                <Form.Label>Select Item:</Form.Label>
                <Form.Control
                  as="select"
                  value={itemId}
                  onChange={(event) => {
                    const selectedOption =
                      event.target.options[event.target.selectedIndex];
                    // Access the custom attribute
                    const customAttribute = selectedOption.getAttribute("data");
                    handleItemId(event.target.value, customAttribute);
                  }}
                >
                  <option value="">Select...</option>
                  {products?.map((product) => {
                    return (
                      <option
                        value={product._id}
                        key={product._id}
                        data={product.itemName}
                      >
                        {product.itemName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group style={{ width: "20%", marginTop: "10px" }}>
                <Form.Label>Input item quantity</Form.Label>
                <Form.Control
                  as="input"
                  type="number"
                  value={itemCount}
                  onChange={(e) => setItemCount(e.target.value)}
                ></Form.Control>
                <Button
                  variant="success"
                  onClick={() => handleAddSingleItem()}
                  style={{ marginTop: "10px" }}
                >
                  Add Item
                </Button>
              </Form.Group>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};

export default RaiseRequest;
