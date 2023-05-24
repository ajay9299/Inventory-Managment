import MenuBar from "@/components/MenuBar";
import PageHeading from "@/components/PageHeading";
import { getItemsByDepartmentId } from "@/services/item.service";
import { getUsersService } from "@/services/user.service";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const RaiseRequest = () => {
  /** States */
  const [username, setUsername] =
    useState(""); /** Username remain fix for per request.*/
  const [department, setDepartment] =
    useState(""); /** Department remain fix for per request.*/
  const [departmentId, setDepartmentId] = useState("");

  const [data, setData] = useState(
    []
  ); /**Data contains all data related to items. */

  const [items, setItems] = useState([
    { item: "", count: 0 },
  ]); /** Items contains all data related to added dynamic items. */

  /** States for api data storages */
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [products, setProducts] = useState([]);

  /** Handle dynamic added items state */
  const handleAddItem = () => {
    setItems([...items, { item: "", count: 1 }]);
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
    const { item, count, _id } = items[index];

    console.log(item, count, _id);

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

  useEffect(() => {
    const getUsers = async () => {
      try {
        const apiResponse = await getUsersService();
        console.log("api", apiResponse);
        if (apiResponse.status === 200) {
          console.log(apiResponse.data.data);
          setUsers(apiResponse.data.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const apiResponse = await getItemsByDepartmentId(departmentId);

        console.log("apiResponse", apiResponse);
        if (apiResponse.status === 200) {
          console.log(apiResponse.data.data);
          setProducts(apiResponse.data.data);
        }
      } catch (error) {
        alert(error);
      }
    };
    departmentId ? getProducts() : null;
  }, [username, department]);

  function setUserNameAndDepartmentName(userId) {
    if (userId) {
      const [userInfo] = users.filter((user) => user._id === userId);
      setUsername(userId);
      setDepartment(userInfo.departmentId.value);
      setDepartmentId(userInfo.departmentId._id);
    } else {
      setUsername("");
      setDepartment("");
    }
  }

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
              onChange={(e) => {
                console.log("Event", e);
                setUserNameAndDepartmentName(e.target.value);
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

          <Form.Group style={{ marginTop: "10px" }}>
            <Form.Label>Department:</Form.Label>
            <Form.Control
              as="input"
              value={department}
              disabled
              onChange={(e) => setDepartment(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group style={{ marginTop: "10px" }}>
            {items.map((item, index) => (
              <div key={index}>
                <Form.Group>
                  <Form.Label>Select Item:</Form.Label>
                  <Form.Control
                    as="select"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                  >
                    <option value="">Select...</option>
                    {products?.map((product) => {
                      return (
                        <option value={product._id} key={product._id}>
                          {product.itemName}
                        </option>
                      );
                    })}
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
                <td>{username}</td>
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
