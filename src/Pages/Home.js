import { useEffect } from "react";
import { JobListingAPI } from "../api";
import { useCallback } from "react";
import { useState } from "react";

export const Home = () => {
  const [jobsData, setJobsData] = useState({
    data: [],
    pagination: {
      total: 0, //total data
      offset: 0,
      totalPages: 0, //calculated on basis of total data
    },
  });
  const getJobs = useCallback(
    async (pagination = {}) => {
      try {
        const { data } = await JobListingAPI.POST.getJobListing(pagination);
        setJobsData((prev) => ({
          ...prev,
          data: data?.jdList,
          pagination: {
            total: data.totalCount,
            offset: pagination.offset,
            totalPages: Math.ceil(data.totalCount / pagination.limit),
          },
        }));
      } catch (err) {
        console.error("api error: ", err);
      }
    },
    [jobsData]
  );

  useEffect(() => {
    getJobs({ limit: 10, offset: 0 });
  }, []);
  console.log("jobsData: ", jobsData);
  return <div>Home page1111</div>;
};
