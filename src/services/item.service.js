import axios from "axios";

/** Fetch items values based on departmentId*/
export const getItemsService = async () => {
  console.log("path", `${process.env.NEXT_PUBLIC_API_BASE_URL}items`);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}items`,
    headers: {},
  };
  return await axios.request(config);
};

/** Create item using itemName and departmentId*/
export const createItem = async (itemName) => {
  let data = JSON.stringify({
    itemName,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}items`,
    headers: { "Content-Type": "application/json" },
    data: data,
  };
  return await axios.request(config);
};

/** Delete item using itemId*/
export const deleteItem = async (itemId) => {
  console.log(itemId)
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}items/${itemId}`,
    headers: {},
  };
  return await axios.request(config);
};
