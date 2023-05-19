import axios from "axios";

/** Create the drop down value using key and value*/
export const createDropDownByKey = async (key, value) => {
  let data = JSON.stringify({ key, value });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}dropdowns`,
    headers: { "Content-Type": "application/json" },
    data: data,
  };
  return await axios.request(config);
};

/** Fetch the drop down values based on key*/
export const getDropDownByKey = async (key) => {

  console.log(
    "path",
    `${process.env.NEXT_PUBLIC_API_BASE_URL}dropdowns/${key}`
  );

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}dropdowns/${key}`,
    headers: {},
  };
  return await axios.request(config);
};
