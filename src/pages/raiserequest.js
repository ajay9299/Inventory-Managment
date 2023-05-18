import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const RaiseRequest = () => {
  /** States */
  const [username, setUsername] =
    useState(""); /** Username remain fix for per request.*/
  const [department, setDepartment] =
    useState(""); /** Department remain fix for per request.*/

  const [data, setData] = useState(
    []
  ); /**Data contains all data related to items. */

  const [items, setItems] = useState([
    { item: "", count: 0 },
  ]); /** Items contains all data related to added dynamic items. */

  /** Handle dynamic added items state */
  const handleAddItem = () => {
    setItems([...items, { item: "", count: 1 }]);
    console.log("items------------->", items);
    for (let i = 0; i < items.length; i++) {
      const { count, item } = items[i];
      console.log({ username, department, item, count });

      //   setData([...data, { username, department, item, count }]);
    }
  };

  /** Handle dynamic removed items state */
  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    const updatedData = [...data];
    updatedItems.splice(index, 1);
    updatedData.splice(index, 1);
    setData(updatedData);
    setItems(updatedItems);
  };

  //
  const handleItemChange = (index, item) => {
    const updatedItems = [...items];
    let prevState;
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
  const handleAddSingleItem = (index) => {
    const { item, count } = items[index];

    if (!username || !department) {
      alert("Sorry please select valid username and department...");
      return;
    }

    if (!item || !count) {
      alert("Sorry you can't add empty item...");
      return;
    }
    const indexT = data.findIndex((obj) => obj.item === item);
    if (indexT > -1) {
      const updatedItems = data.map((obj) => {
        if (obj.item === item) {
          return { ...obj, count };
        }
        return obj;
      });
      setData(updatedItems);
    } else {
      setData([...data, { username, department, item, count }]);
    }
  };

  /** Handle submit request operation */
  const submitRequest = () => {
    setUsername("");
    setDepartment("");
  };

  return (
    <>
      <MenuBar />
      <PageHeading pageHeading={"Raise New Request"} />

      <Container style={{ width: "80%" }}>
        <Form>
          <Form.Group>
            <Form.Label>Select Username:</Form.Label>
            <Form.Control
              as="select"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Ajay">Ajay</option>
              <option value="Shivam">Shivam</option>
              {/* Add username options */}
            </Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>Select Department:</Form.Label>
            <Form.Control
              as="select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Hr">Hr</option>
              <option value="Php">Php</option>
              {/* Add department options */}
            </Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: "10px" }}>
            {items.map((item, index) => (
              <div key={index}>
                <Form.Group>
                  <Form.Label>Select Item:</Form.Label>
                  <Form.Control
                    as="select"
                    value={item.item}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Water-Bottles">Water-Bottles</option>
                    {/* Add item options */}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      variant="secondary"
                      onClick={() => handleCountChange(index, item.count - 1)}
                      style={{ marginRight: "5px" }}
                    >
                      -
                    </Button>
                    <span>{item.count}</span>
                    <Button
                      variant="secondary"
                      onClick={() => handleCountChange(index, item.count + 1)}
                      style={{ marginLeft: "5px", marginRight: "20px" }}
                    >
                      +
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleAddSingleItem(index)}
                      style={{ marginLeft: "5px", marginRight: "20px" }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove Item
                    </Button>
                    {/* {index !== 0 && (
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove Item
                      </Button>
                    )} */}
                  </div>
                </Form.Group>
              </div>
            ))}

            <Button
              variant="primary"
              onClick={handleAddItem}
              style={{ marginTop: "10px" }}
            >
              Add More Item
            </Button>
          </Form.Group>
          <Button
            variant="secondary"
            onClick={submitRequest}
            style={{ marginTop: "10px", color: "white" }}
          >
            Submit Request
          </Button>
        </Form>

        <Table striped bordered hover style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Department</th>
              <th>Item</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.department}</td>
                <td>{item.item}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default RaiseRequest;
