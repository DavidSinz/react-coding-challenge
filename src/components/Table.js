const Table = ({ data }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type of absence</th>
            <th>Period</th>
            <th>Member note</th>
            <th>Status</th>
            <th>Admitter note</th>
          </tr>
        </thead>
        <tbody>
          {data.map((absence) => (
            <tr key={absence.id}>
              <td>{absence.name}</td>
              <td>{absence.type}</td>
              <td>
                {absence.period[0]} --- {absence.period[1]}
              </td>
              <td>{absence.memberNote}</td>
              <td>{absence.status}</td>
              <td>{absence.admitterNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
