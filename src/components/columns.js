import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Member Name",
    accessor: "name",
    sticky: "left",
  },
  {
    Header: "Type of absence",
    accessor: "type",
    sticky: "left",
  },
  {
    Header: "Period",
    accessor: "period",
    sticky: "left",
  },
  {
    Header: "Member Note",
    accessor: "memberNote",
    sticky: "left",
  },
  {
    Header: "Status",
    accessor: "status",
    sticky: "left",
  },
  {
    Header: "Admitter Note",
    accessor: "admitterNote",
    sticky: "left",
  },
];
