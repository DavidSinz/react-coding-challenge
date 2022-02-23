import React from "react";
import RenderTable from "./RenderTable";

class AbsenceTable extends React.Component {
  constructor(props) {
    super(props);
    this.input = [];
    this.error = false;
    this.state = {
      data: [],
      dataIsLoaded: false,
    };
  }

  recieveStatus(confirmed, rejected) {
    let result = "requested";
    if (confirmed != null) {
      result = "confirmed";
    } else if (rejected != null) {
      result = "rejected";
    }
    return result;
  }

  manipulateData(input) {
    let result = [];
    this.totalNum = input.length;
    for (let i = 0; i < input.length; i++) {
      result.push({
        id: i,
        name: input[i].name,
        type: input[i].type,
        memberNote: input[i].memberNote,
        admitterNote: input[i].admitterNote,
        period: input[i].startDate + " " + input[i].endDate,
        status: this.recieveStatus(input[i].confirmedAt, input[i].rejectedAt),
      });
    }
    this.input = result;
    return result;
  }

  componentDidMount() {
    fetch("https://absence-mgr-api.herokuapp.com/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          data: this.manipulateData(json),
          dataIsLoaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.error = true;
        this.setState({
          data: null,
          dataIsLoaded: true,
        });
      });
  }

  render() {
    const { dataIsLoaded, data } = this.state;
    if (this.error)
      return (
        <div>
          <h1> An error occurred ... </h1>
        </div>
      );
    if (!dataIsLoaded)
      return (
        <div>
          <h1> Pleses wait until data is loaded ... </h1>
        </div>
      );
    if (data.length < 1)
      return (
        <div>
          <h1> There are no absences ... </h1>
        </div>
      );
    return (
      <>
        <div className="row">
          <div className="input-field col s6">
            <select
              onChange={(e) => {
                let result = [];
                if (e.target.value == "vacation") {
                  result = this.input.filter((r) => {
                    return r.type == e.target.value;
                  });
                }
                if (e.target.value == "sickness") {
                  result = this.input.filter((r) => {
                    return r.type == e.target.value;
                  });
                }
                if (e.target.value == "none") result = this.input;
                this.setState({
                  data: result,
                  dataIsLoaded: true,
                });
              }}
              className="browser-default"
              name="type"
              id="type"
            >
              <option value="none">None</option>
              <option value="vacation">Vacation</option>
              <option value="sickness">Sickness</option>
            </select>
          </div>
          <div className="input-field col s6">
            <input
              onChange={(e) => {
                if (
                  new Date(e.target.value) !== "Invalid Date" &&
                  !isNaN(new Date(e.target.value)) &&
                  e.target.value.length == 10
                ) {
                  let result = [];
                  result = this.input.filter((r) => {
                    let dates = r.period.split(" ");
                    console.log(dates);
                    return (
                      new Date(dates[0]) <= new Date(e.target.value) &&
                      new Date(dates[1]) >= new Date(e.target.value)
                    );
                  });
                  this.setState({
                    data: result,
                    dataIsLoaded: true,
                  });
                } else {
                  this.setState({
                    data: this.input,
                    dataIsLoaded: true,
                  });
                }
              }}
              className="validate"
              id="type"
              name="type"
              type="text"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>
        <RenderTable data={data} totalNum={this.totalNum} />
      </>
    );
  }
}

export default AbsenceTable;
