import React, { useState, useEffect } from "react";

const GetCalendarData = ({ startDate, endDate, date }) => {
  const [item, setItem] = useState([]);
  const URL = `https://admin.dcparktignes.com/api/park/dates-between?startDate=${startDate}&endDate=${endDate}`;
  console.log(URL);
  const fetchItem = async () => {
    const fetchItem = await fetch(URL);
    const item = await fetchItem.json();

    setItem(item);
    console.log(item);
  };
  useEffect(() => {
    fetchItem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);
  return (
    <div>
      <div className="">{item.message}</div>
      <div className="">
        {item.status === "Failed" && <div>Please Choose Two Dates</div>}
        <ul>
          {item.data &&
            item.data.map((todo) => <li key={todo._id}>{todo.first_name}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default GetCalendarData;
