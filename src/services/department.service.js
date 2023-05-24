import axios from "axios";

/** Create department with departmentHead */
export const createDepartment = async (departmentName, departmentHeadId) => {
  try {
    let data = JSON.stringify({
      departmentName,
      departmentHeadId,
    });

    console.log("info", data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`,
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

/** Get departments */
export const getDepartmentsService = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments`,
      headers: {},
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

/** Delete department using departmentId*/
export const deleteDepartment = async (departmentId) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments/${departmentId}`,
    headers: {},
  };
  return await axios.request(config);
};

/** Update department using departmentId*/
export const updateDepartment = async (
  departmentId,
  departmentName,
  departmentHeadId
) => {
  let data = JSON.stringify({ departmentName, departmentHeadId });

  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}departments/${departmentId}`,
    headers: { "Content-Type": "application/json" },
    data: data,
  };
  return await axios.request(config);
};
