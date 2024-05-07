import axios from "axios";
import apiConfig from "./config";

const config = {
  baseURL: apiConfig.BASE_URL,
};

let headers = {
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  headers,
});

const errorCalback = (error) => {
  const { response } = error;
  if (response.status === 500) {
    console.error(response?.data?.message);
    return;
  }
  return response;
};

axiosInstance.interceptors.response.use((response) => response, errorCalback);

export const JobListingAPI = {
  POST: {
    getJobListing(pagination = { limit: 10, offset: 0 }) {
      return axiosInstance.post(
        `/${apiConfig.POST.getJobs.BASE}`,
        JSON.stringify(pagination || {})
      );
    },
  },
};
