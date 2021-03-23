import React, { useState, useEffect, Suspense } from "react";

const GetData = (props) => {
  const URL = `https://admin.dcparktignes.com/api/park/yesterday`;
  const [data, setItem] = useState([]);
  const fetchItem = async () => {
    const fetchItem = await fetch(URL);
    const data = await fetchItem.json();
    setItem(data);
    // console.log(data.length);
  };
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-6">{data.length}</div>
    </>
  );
};
export default GetData;
