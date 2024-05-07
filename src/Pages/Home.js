import { useEffect, useCallback, useState } from "react";
import { JobListingAPI } from "../api";
import { JobCard } from "../Components";
import Styles from "./index.module.css";
import { useInView } from "react-intersection-observer";

export const Home = () => {
  const [jobsData, setJobsData] = useState({
    data: [],
    pagination: {
      total: 0, //total data
      offset: 0,
      totalPages: 0, //calculated on basis of total data
    },
  });
  const [isFetching, setIsFetching] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    trackVisibility: true,
    delay: 500,
    threshold: 0,
  });

  const getJobs = useCallback(
    async (pagination = {}) => {
      try {
        const { data } = await JobListingAPI.POST.getJobListing(pagination);
        //initial conditions
        if (pagination.offset === 0 && jobsData.pagination.offset === 0) {
          setJobsData((prev) => ({
            ...prev,
            data: [...data?.jdList],
            pagination: {
              total: data.totalCount,
              offset: pagination.offset,
              totalPages: Math.ceil(data.totalCount / pagination.limit),
            },
          }));
        } else if (
          //condition for further offsets
          pagination.offset > jobsData.pagination.offset
        ) {
          setJobsData((prev) => ({
            ...prev,
            data: [...prev.data, ...data?.jdList],
            pagination: {
              total: data.totalCount,
              offset: pagination.offset,
              totalPages: Math.ceil(data.totalCount / pagination.limit),
            },
          }));
        }
        setIsFetching(false);
      } catch (err) {
        console.error("api error: ", err);
      }
    },
    [jobsData]
  );

  function getMorePosts() {
    setTimeout(() => {
      getJobs({ limit: 10, offset: jobsData.pagination.offset + 1 });
    }, 2000);
  }

  useEffect(() => {
    getJobs({ limit: 10, offset: 0 });
  }, []);

  useEffect(() => {
    if (inView) {
      setIsFetching(true);
    }
  }, [inView]);

  useEffect(() => {
    if (isFetching) getMorePosts();
  }, [isFetching]);

  return (
    <div>
      Job filters section
      <div className={Styles["job-cards__container"]}>
        {jobsData.data.length
          ? jobsData.data.map((job) => <JobCard key={job.jdUid} job={job} />)
          : null}
      </div>
      {!isFetching && jobsData.data.length ? (
        <div ref={ref} style={{ height: "10px", width: "100%" }} />
      ) : null}
      {isFetching ? (
        <p
          style={{
            textAlign: "center",
          }}
        >
          Loading data....
        </p>
      ) : null}
    </div>
  );
};
