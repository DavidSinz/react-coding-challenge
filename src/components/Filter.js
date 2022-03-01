import { useState } from "react";

const Filter = ({ type, onType, onDate }) => {
  const [date, setDate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(date);
    if (
      (new Date(date) !== "Invalid Date" && !isNaN(new Date(date))) ||
      date === ""
    ) {
      onDate(date);
    } else {
      alert("This is not a valid date");
      setDate("");
    }
  };

  return (
    <>
      <div>
        <div className="dropdown">
          <button className="typeFilter-button">Filter by type</button>
          <div className="dropdown-content">
            <option
              className={type == "none" ? "active" : ""}
              onClick={onType}
              value={"none"}
            >
              None
            </option>
            <option
              className={type == "vacation" ? "active" : ""}
              onClick={onType}
              value={"vacation"}
            >
              Vacation
            </option>
            <option
              className={type == "sickness" ? "active" : ""}
              onClick={onType}
              value={"sickness"}
            >
              Sickness
            </option>
          </div>
        </div>
        <form className="dateFilter center" onSubmit={onSubmit}>
          <label>Filter for Date:</label>
          <input
            type={"date"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input type={"submit"} value={"search date"} />
        </form>
      </div>
    </>
  );
};

export default Filter;
