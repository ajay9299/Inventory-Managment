import axios from "axios";

export const addRequestService = async (requestInfo) => {
  try {
    let data = JSON.stringify(requestInfo);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/api/v1/requests",
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const getItemInfoBasedOnUserInformation = async (info) => {
  try {
    let data = JSON.stringify(info);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/api/v1/requests/item-store-request",
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const getRequestHistory = async (userInfo) => {
  try {
    console.log("userInfo", userInfo);
    let data = JSON.stringify(userInfo);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/api/v1/requests/get-items-count-with-status",
      headers: { "Content-Type": "application/json" },
      data: data,
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const getRequestInfoById = async (requestId) => {
  try {
    const axios = require("axios");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/api/v1/requests/get-item-info-by-itemId/${requestId}`,
      headers: {},
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};
