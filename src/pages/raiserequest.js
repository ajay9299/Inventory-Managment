import Loader from "@/components/Loader";
import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import TableComponent from "@/components/Table";
import ModalBox from "@/components/modals/ModalBox";
import { getItemsService } from "@/services/item.service";
import {
  addRequestService,
  getItemInfoBasedOnUserInformation,
} from "@/services/request.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const RaiseRequest = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /** States */
  const [username, setUsername] =
    useState(""); /** Username remain fix for per request.*/
  const [department, setDepartment] =
    useState(""); /** Department remain fix for per request.*/
  const [isLoaderLoading, setLoaderLoading] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  let data = [];
  /**Data contains all data related to items. */
  const [departmentChange, setDepartmentChange] = useState("");
  const [column, setColumn] = useState([
    "S.No.",
    "ItemName",
    "ItemQuantity",
    "Action",
  ]);
  const [tableHeading, setTableHeading] = useState("Items info");
  const [modelItemInfo, setModelItemInfo] = useState({});

  const [items, setItems] = useState(
    []
  ); /** Items contains all data related to added dynamic items. */

  /** States for api data storages */
  const [products, setProducts] = useState([]);
  const [userObject, setUserObject] = useState({});
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

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
  const handleRemoveItem = (deleteIndex) => {
    const removedItemId = items[deleteIndex];
    const updatedItems = [...items];
    const removedProduct = selectedProduct.find(
      (product) => product._id === removedItemId.itemId
    );
    // Remove the item from selected product array
    setSelectedProduct(
      selectedProduct.filter((product) => product._id !== removedItemId.itemId)
    );

    setProducts((prev) => [...prev, removedProduct]);

    setItems(updatedItems.filter((item, index) => index !== deleteIndex));
  };

  /** Handle single item add operation that is used to add item in table. */
  const handleAddSingleItem = () => {
    const selectedProductInfo = products.find(
      (product) => product._id === selectedProductId
    );
    setSelectedProduct((prev) => [...prev, selectedProductInfo]);
    setProducts(
      products.filter((product) => product._id !== selectedProductId)
    );
    setItems((prev) => [...prev, { itemName, itemCount, itemId }]);
  };

  function handleItemId(itemId, itemName) {
    setItemId(itemId);
    setItemName(itemName);
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

  /** HandleItem count increment and decrement*/
  function handleItemCount(index, currentItemCount) {
    if (currentItemCount < 1) {
      return;
    }
    const updatedItems = [...items];

    console.log("itemCount", currentItemCount);
    updatedItems[index].itemCount = currentItemCount;
    setItems(updatedItems);
  }

  const tableBody = items?.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.itemName}</td>
      <td>{item.itemCount}</td>
      <td style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="secondary"
          style={{ marginRight: "10px" }}
          onClick={() => handleItemCount(index, Number(item.itemCount) - 1)}
        >
          -
        </Button>
        <div
          style={{
            height: "40px",
            width: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {item.itemCount}
        </div>
        <Button
          variant="secondary"
          style={{ marginRight: "10px" }}
          onClick={() => handleItemCount(index, Number(item.itemCount) + 1)}
        >
          +
        </Button>
        <OverlayTrigger
          placement="top"
          delay={{ show: 400, hide: 400 }}
          overlay={renderTooltip("Delete")}
        >
          <Button
            variant="danger"
            style={{ marginRight: "10px" }}
            onClick={() => handleRemoveItem(index)}
          >
            <span className="material-symbols-outlined">delete</span>
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  ));

  const itemInfo = {
    itemName: "pen",
    totalDemandedQuantity: 20,
    totalFullFilledQuantity: 10,
    totalOutStandingQuantity: 10,
    totalConsumedQuantity: 5,
    totalAvailableQuantity: 5,
  };

  const modelBody = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {modelItemInfo ? (
          <>
            <div>
              <h5>Item Name</h5>
              <h5>Total Demanded Quantity</h5>
              <h5>Total FullFilled Quantity</h5>
              <h5>Total OutStanding Quantity</h5>
              <h5>Total Consumed Quantity</h5>
              <h5>Total Available Quantity</h5>{" "}
            </div>{" "}
            <div>
              <h5>{modelItemInfo?.itemId?.itemName}</h5>
              <h5>{modelItemInfo?.requiredQuantity}</h5>
              <h5>{modelItemInfo?.receivedQuantity}</h5>
              <h5>
                {modelItemInfo?.requiredQuantity -
                  modelItemInfo?.receivedQuantity}
              </h5>
              <h5>{modelItemInfo?.consumedQuantity}</h5>
              <h5>
                {modelItemInfo?.receivedQuantity -
                  modelItemInfo?.consumedQuantity}
              </h5>{" "}
            </div>
          </>
        ) : (
          <h5>Item not requested yet</h5>
        )}
      </div>
    </>
  );

  async function getSelectedItemInfo(itemId) {
    const itemInfo = await getItemInfoBasedOnUserInformation({
      userId: userObject.value,
      departmentId: userObject.departmentId._id,
      itemId,
    });

    if (itemInfo.status === 200) {
      console.log("<><><><><>>", itemInfo.data);
      setModelItemInfo(itemInfo.data.data);
    }
  }

  async function addRequest() {
    setLoaderLoading(false);
    data = items.map((item) => {
      const { itemId, itemCount } = item;
      return { itemId, requiredQuantity: Number(itemCount) };
    });

    const apiData = {
      itemInfo: data,
      userId: userObject.value,
      departmentId: userObject.departmentId._id,
    };

    const apiResponse = await addRequestService(apiData);
    if (apiResponse.status === 200) {
      setLoaderLoading(true);
      toast("Request added successfully", { autoClose: 2000 });
      setTimeout(() => {
        router.replace("/request");
      }, 2000);
    }
  }
  /** Load department*/
  function loadDepartment(department) {
    setDepartmentChange(department);
  }

  return (
    <>
      <MenuBar loadUser={userObject} loadDepartment={loadDepartment} />
      {!isLoaderLoading ? (
        <Loader />
      ) : (
        <>
          <ToastContainer />
          <PageHeading pageHeading={"Raise New Request"} />
          <ModalBox
            disabled={isLoading}
            isOpen={show}
            title="Item Info"
            onClose={() => setShow(false)}
            onSubmit={() => handleSubmit}
            body={modelBody}
          />
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
                    setSelectedProductId(event.target.value);
                    const customAttribute = selectedOption.getAttribute("data");
                    handleItemId(event.target.value, customAttribute);
                    setShow(true);
                    getSelectedItemInfo(event.target.value);
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
                  disabled={products.length !== 0 ? false : true}
                >
                  Add Item
                </Button>
              </Form.Group>
            </Form>
            <TableComponent
              tableHeading={tableHeading}
              column={column}
              tableBody={tableBody}
            />

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="success"
                disabled={items.length !== 0 ? false : true}
                onClick={() => addRequest()}
              >
                Add Request
              </Button>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default RaiseRequest;
