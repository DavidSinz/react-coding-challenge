import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

const AbsenceView = () => {
  const [absenceData, setAbsenceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("none");
  const [loadingErr, setLoadingErr] = useState(false);
  let pageLength = 1;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://absence-mgr-api.herokuapp.com/")
      .then((res) => res.json())
      .then((json) => processData(json))
      .catch((err) => setLoadingErr(true));
  };

  const processData = (data) => {
    data.forEach((item) => addPeriodToAbsence(item));
    setAbsenceData(data);
  };

  const addPeriodToAbsence = (item) => {
    item.period = [item.startDate, item.endDate];
    if (item.rejectedAt) item.status = "Rejected";
    else if (item.confirmedAt) item.status = "Confirmed";
    else item.status = "Requested";
    return item;
  };

  const getTableData = (data) => {
    let result = filterByType(data);
    result = filterByDate(result);
    pageLength = Math.ceil(result.length / 10);
    result = getCurrPageData(result);
    return result;
  };

  const filterByDate = (data) => {
    if (dateFilter !== "") {
      const dateInput = new Date(dateFilter);
      let result = [];
      data.forEach((absence) => {
        if (
          new Date(absence.period[0]) <= dateInput &&
          new Date(absence.period[1]) >= dateInput
        )
          result.push(absence);
      });
      return result;
    }
    return data;
  };

  const filterByType = (data) => {
    if (typeFilter !== "none") {
      let result = [];
      data.forEach((absence) => {
        if (absence.type === typeFilter) result.push(absence);
      });
      return result;
    }
    return data;
  };

  const getCurrPageData = (data) => {
    return data.slice((currentPage - 1) * 10, currentPage * 10 - 1);
  };

  const onDate = (date) => setDateFilter(date);

  const onType = (type) =>
    typeFilter !== type ? setTypeFilter(type.target.value) : null;

  const onFirst = () => (currentPage !== 1 ? setCurrentPage(1) : null);

  const onPrev = () =>
    currentPage > 1 ? setCurrentPage(currentPage - 1) : null;

  const onNext = () =>
    currentPage < pageLength ? setCurrentPage(currentPage + 1) : null;

  const onLast = () =>
    currentPage !== pageLength ? setCurrentPage(pageLength) : null;

  return (
    <>
      <div className="container">
        <Filter type={typeFilter} onType={onType} onDate={onDate} />
        <Table data={getTableData(absenceData)} />
        <div
          style={
            getTableData(absenceData).length === 0
              ? { display: "block" }
              : { display: "none" }
          }
        >
          No data to show!
        </div>
        <div style={loadingErr ? { display: "block" } : { display: "none" }}>
          Error loading data!
        </div>
        <Pagination
          curPage={currentPage}
          maxPages={pageLength}
          onFirst={onFirst}
          onPrev={onPrev}
          onNext={onNext}
          onLast={onLast}
        />
      </div>
    </>
  );
};

export default AbsenceView;
