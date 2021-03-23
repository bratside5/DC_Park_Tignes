import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

export default function Calender() {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const startDate = date[0].startDate.toISOString().substr(0, 10);
  let endDate = date[0].endDate;
  if (endDate === null) {
    endDate = date[0].endDate;
    console.log("no end date");
  } else {
    endDate = date[0].endDate.toISOString().substr(0, 10);
  }
  console.log(startDate, endDate);

  return (
    <>
      <div class="flex flex-wrap">
        <div class=" md:w-1/2 xl:w-1/3 p-3">
          <div class="bg-gray-700 border border-gray-400 rounded shadow p-2 h-full w-full">
            <div class="flex flex-row items-center">
              <div class="flex-shrink"></div>
              <div class="flex-1  pb-6 md:text-center">
                <h5 class="font-bold uppercase text-gray-200 pb-6">Calendar</h5>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                />
              </div>
            </div>
          </div>
        </div>

        <div class=" md:w-1/2 xl:w-1/3 p-3">
          <div class="bg-gray-700 border border-gray-400 rounded shadow p-2 h-full">
            <div class="flex flex-row items-center">
              <div class="flex-shrink py-4"></div>
              <div class="flex-1 md:text-center">
                <h5 class="font-bold uppercase text-gray-200">
                  Calendar Results
                </h5>
                <GetCalendarData
                  startDate={startDate}
                  endDate={endDate}
                  date={date}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const GetCalendarData = ({ startDate, endDate, date }) => {
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const URL = `https://admin.dcparktignes.com/api/park/dates-between?startDate=${startDate}&endDate=${endDate}`;
  console.log(URL);
  const fetchItem = async () => {
    setLoading(true);
    const fetchItem = await fetch(URL);
    const item = await fetchItem.json();
    setLoading(false);
    setItem(item);
    console.log(item);
  };
  useEffect(() => {
    fetchItem();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  if (loading) {
    return <h2>loading</h2>;
  }

  const emailFilter =
    item.data && item.data ? item.data.filter((m) => m.email) : `No Data Yet`;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = emailFilter.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);
  return (
    <div className="">
      <div className="text-gray-400 py-6">{item.message}</div>
      <div className="text-gray-400 text-2xl">On this selected date range </div>
      <div className="font-bold text-3xl py-3 text-gray-300">
        {item.data && item.data.length
          ? `${item.data.length}`
          : `No Data Yet...`}
      </div>
      <div className="text-gray-400 text-2xl">
        Have registered to use the park
      </div>
      <hr className="w-1/4 my-3 mx-auto" />
      <div className="font-bold text-3xl text-gray-300">
        {emailFilter.length}
      </div>
      <div className="text-gray-400 text-2xl pb-3">
        People provided Email Addresses
      </div>
      <div className="">
        <ul>
          {currentItems > 0 && currentItems ? (
            currentItems.map((items) => <li key={items._id}>{items.email}</li>)
          ) : (
            <p className="font-bold text-3xl py-3 text-gray-300">
              No data yet...
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

// // loading component for suspense fallback
// const Loader = () => (
//   <div className="App">
//     <div>loading...</div>
//   </div>
// );
