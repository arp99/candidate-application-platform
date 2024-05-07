import { useEffect, useCallback, useState } from "react";
import { JobListingAPI } from "../api";
import { JobCard, Filters } from "../Components";
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
  const [filteredJobs, setFilteredJobs] = useState({
    data: [],
  });
  const [isFetching, setIsFetching] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

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

          setFilteredJobs((prev) => ({
            ...prev,
            data: [...data?.jdList],
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

          setFilteredJobs((prev) => ({
            ...prev,
            data: [...prev.data, ...data?.jdList],
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

  const filterChangeCallback = (filterValue) => {
    console.log("filterValue: ", filterValue);
    const { Roles, Experience, Location, BasePay, CompanyName } = filterValue;
    if (
      !Roles?.length &&
      !Experience &&
      !Location?.length &&
      !BasePay &&
      !CompanyName
    ) {
      //filters resetted
      setFilterApplied(false);
      getJobs({ limit: 10, offset: 0 });
    } else {
      setFilterApplied(true);

      let filteredData =
        Roles && Roles.length
          ? jobsData.data.filter((job) => {
              const RolesList = Roles.map(({ value }) => value.toLowerCase());

              if (RolesList.includes(job.jobRole.toLowerCase())) {
                return true;
              }
              return false;
            })
          : jobsData.data;

      filteredData =
        Experience && Experience.value
          ? jobsData.data
              .filter((job) => {
                if (job.minExp) {
                  return job.minExp >= Experience.value;
                }
                return false;
              })
              .sort((a, b) => {
                // Treat null values as 0
                const minExpA = a.minExp !== null ? a.minExp : 0;
                const minExpB = b.minExp !== null ? b.minExp : 0;
                return minExpA - minExpB;
              })
          : jobsData.data;

      filteredData =
        Location && Location.length
          ? jobsData.data.filter((job) => {
              const locationList = Location.map(({ value }) =>
                value.toLowerCase()
              );
              let onsite = false;
              if (locationList.includes("in-office")) {
                onsite = true;
              }
              if (
                onsite &&
                job.location.toLowerCase() !== "remote" &&
                job.location.toLowerCase() !== "hybrid" &&
                !locationList.includes(job.location?.toLowerCase())
              ) {
                // case for in-office
                return true;
              } else if (locationList.includes(job.location?.toLowerCase())) {
                return true;
              } else {
                return false;
              }
            })
          : jobsData.data;

      filteredData =
        BasePay && BasePay.value
          ? jobsData.data.filter((job) => {
              if (job.minJdSalary) {
                return job.minJdSalary >= BasePay.value;
              } else if (job.maxJdSalary) {
                return job.maxJdSalary >= BasePay.value;
              }
              return false;
            })
          : jobsData.data;

      filteredData = CompanyName
        ? jobsData.data.filter((job) => {
            if (
              job.companyName
                ?.toLowerCase()
                ?.includes(CompanyName.toLowerCase())
            ) {
              return true;
            }
            return false;
          })
        : jobsData.data;

      setFilteredJobs((prev) => ({
        data: filteredData,
      }));
    }

    //now filter the data according to the filters selected one by one
  };

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

  console.log("filteredJobs: ", filteredJobs);

  return (
    <div>
      <Filters filterChangeCallback={filterChangeCallback} />
      <div className={Styles["job-cards__container"]}>
        {filteredJobs?.data?.length ? (
          filteredJobs?.data?.map((job) => (
            <JobCard key={job.jdUid} job={job} />
          ))
        ) : (
          <p>No Jobs Found</p>
        )}
      </div>
      {!isFetching && filteredJobs?.data?.length && !filterApplied ? (
        <div
          ref={ref}
          style={{ height: "10px", width: "100%"}}
        />
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
