import Styles from "./index.module.css";

export const JobCard = ({ job }) => {
  return (
    <div className={Styles["job-card__container"]}>
      <div className={Styles["card-content"]}>
        <div className={Styles["job-info"]}>
          <div className={Styles["company-info__container"]}>
            <div className={Styles["company-name-role__container"]}>
              <h3 className={Styles["company-name"]}>{job.companyName}</h3>
              <h2 className={Styles["job-position"]}>{job.jobRole}</h2>
            </div>
            <p className={Styles["job-location"]}>{job.location}</p>
          </div>
        </div>
        <div className={Styles["job-salary-range"]}>
          Estimated Salary:{" "}
          {job.minJdSalary
            ? `${job.salaryCurrencyCode}${job.minJdSalary} - ${job.maxJdSalary}`
            : `${job.salaryCurrencyCode}${job.maxJdSalary}`}
        </div>
        <div className={Styles["company-info"]}>
          <div>
            <p className={Styles["heading"]}>About Company</p>
            <div className={Styles["job-description"]}>
              {job.jobDetailsFromCompany}
            </div>
          </div>
        </div>
        <div className={Styles["show-more-action"]}>Show More</div>
        <div className={Styles["job-experience-info"]}>
          <h3>Minimum Experience</h3>
          <h2>{job?.minExp ? job.minExp : 0} years</h2>
        </div>
      </div>
      <div className={Styles["action-buttons__container"]}>
        <div className={Styles["apply-btn"]}>Easy Apply</div>
      </div>
    </div>
  );
};
