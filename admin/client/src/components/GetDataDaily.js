import React, { useState, useEffect, Suspense } from "react";

const GetData = (props) => {
  const URL = `http://dcparktignes.com/api/park/daily`;
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
      <div className="text-xl py-6 px-12">
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
export default GetData;
