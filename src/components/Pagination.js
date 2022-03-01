const Pagination = (props) => {
  return (
    <>
      <div className="center">
        <button onClick={props.onFirst}>Start</button>
        <button onClick={props.onPrev}>Previous</button>
        <span className="pages-display">
          Page {props.curPage} of {props.maxPages}
        </span>
        <button onClick={props.onNext}>Next</button>
        <button onClick={props.onLast}>End</button>
      </div>
    </>
  );
};

export default Pagination;
