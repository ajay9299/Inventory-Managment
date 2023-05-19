import axios from "axios";

/** Fetch items values based on departmentId*/
export const getItemsByDepartmentId = async (departmentId) => {
  console.log(
    "path",
    `${process.env.NEXT_PUBLIC_API_BASE_URL}items/${departmentId}`
  );

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}items/${departmentId}`,
    headers: {},
  };
  return await axios.request(config);
};

/** Create item using itemName and departmentId*/
export const createItem = async (itemName, departmentId) => {
  let data = JSON.stringify({
    itemName,
    departmentId,
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
