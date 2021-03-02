import React, { useState, useEffect, Suspense } from "react";

export const GetData = (props) => {
  const URL = "http://localhost:5000/api/park/daily"; //`http://dcparktignes.com/api/park`;
  const [data, setItem] = useState([]);
  const fetchItem = async () => {
    const fetchItem = await fetch(URL);
    const data = await fetchItem.json();
    setItem(data);
    console.log(data.length);
  };
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="text-xl border border-gray-800 rounded py-6 px-12">
        {data.length} people have registered today{" "}
      </div>
      {/* {data &&
        data.map((data) => (
          <div key={data._id} className="">
            <div className="">
              {data.first_name} {data.second_name} {data.length}
            </div>
            <div className="">Is Registered? {data.isRegistered}</div>
            <div className="">Registered at... {data.date}</div>
          </div>
        ))} */}
    </>
  );
};
