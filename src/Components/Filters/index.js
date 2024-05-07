import Select from "react-select";
import {
  BasePayOptions,
  EmployeesOptions,
  ExperienceOptions,
  LocationOptions,
  groupedRoleOptions,
} from "./data";
import Styles from "./index.module.css";
import { useEffect, useState } from "react";

const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
  </div>
);

export const Filters = ({ filterChangeCallback }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const onFilterChange = (filterName, value) => {
    if (!value) {
      const ogFilters = { ...selectedFilters };
      delete ogFilters[filterName];
      setSelectedFilters(ogFilters);
    } else if (Array.isArray(value) && !value.length) {
      const ogFilters = { ...selectedFilters };
      delete ogFilters[filterName];
      setSelectedFilters(ogFilters);
    } else {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterName]: value,
      }));
    }
  };

  useEffect(() => {
    filterChangeCallback(selectedFilters);
  }, [selectedFilters]);

  return (
    <div className={Styles["filters__container"]}>
      <Select
        options={groupedRoleOptions}
        placeholder="Roles"
        formatGroupLabel={formatGroupLabel}
        isMulti
        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: "200px",
          }),
        }}
        value={selectedFilters["Roles"]}
        onChange={(data) => onFilterChange("Roles", data)}
      />
      <Select
        options={ExperienceOptions}
        placeholder="Experience"
        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: "100px",
          }),
        }}
        isClearable
        value={selectedFilters["Experience"]}
        onChange={(data) => onFilterChange("Experience", data)}
      />
      <Select
        options={LocationOptions}
        isMulti
        placeholder="Location"
        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: "100px",
          }),
        }}
        value={selectedFilters["Location"]}
        onChange={(data) => onFilterChange("Location", data)}
      />
      <Select
        options={BasePayOptions}
        placeholder="Minimum Base Pay Salary"
        styles={{
          container: (baseStyles, state) => ({
            ...baseStyles,
            minWidth: "100px",
          }),
        }}
        isClearable
        value={selectedFilters["BasePay"]}
        onChange={(data) => onFilterChange("BasePay", data)}
      />
      <input
        className={Styles["company-name-input"]}
        value={selectedFilters["CompanyName"]}
        placeholder="Search Company Name"
        onChange={(evt) => onFilterChange("CompanyName", evt.target.value)}
      />
    </div>
  );
};
