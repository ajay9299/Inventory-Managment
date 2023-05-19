import axios from "axios";

/** Create new user based on userName , departmentId and role*/
export const createUser = async (userName, departmentId, role) => {
  let data = JSON.stringify({
    userName,
    role,
    departmentId,
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}users`,
    headers: { "Content-Type": "application/json" },
    data: data,
  };
  return axios.request(config);
};

/** get users */
export const getUsersUsingApi = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}users`,
    headers: {},
  };
  return await axios.request(config);
};
