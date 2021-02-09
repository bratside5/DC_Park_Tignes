import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.jpeg";
import Lang from "./Lang";

const SignIn = () => {
  const newDate = new Date();
  const formData = {
    defaultValues: {
      sector: "",
      isPida: "",
      isClosed: "",
      machines_working: "",
      risk_level: "",
      date: newDate.toLocaleString(),
    },
  };
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, errors } = useForm({ formData });
  const submitForm = async (formData) => {
    setSubmitting(true);
    const response = await fetch(
      "http://localhost:5000/api/pida/palafour/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sector: formData.sector,
          isPida: formData.isPida,
          isClosed: formData.isClosed,
          machines_working: formData.machines_working,
          risk_level: formData.risk_level,
          date: newDate.toLocaleString(),
        }),
      }
    );
    const data = await response.json();
    if (data.errors) {
      // setServerErrors(data.errors);
    } else {
      console.log("success, redirect to home page");
    }
    setSubmitting(false);
  };
  return (
    <>
      <main className="antialiased overflow-hidden">
        <div className="container">
          <img src={logo} alt="" />
        </div>
        <div className="container mx-auto px-3">
          <h1 className="text-4xl text-center">
            Welcome to DC Snowpark Tignes
          </h1>
        </div>
        <div className="py-6">
          <Lang />
        </div>
        <div className="container mx-auto">
          <h1 className="text-xl text-center font-medium py-3">
            Please Sign In Below To Use The Park
          </h1>
          <h2 className="text-lg text-center font-light py-3">
            Only people using the facilities are permitted inside, we kindly ask
            that you spectate from outside the of the fenced area
          </h2>
          <h2 className="text-lg text-center font-light py-3">
            Masks & Social Distancing Are Mandatory
          </h2>
        </div>
        <section className="mt-6 bg-gray-200">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col items-center justify-center mt-4 pt-6">
              <label
                htmlFor="firstName"
                className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
              >
                First Name
              </label>
              <input
                className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
                name="firstName"
                ref={register}
              />
            </div>

            <div className="flex flex-col items-center justify-center pt-4">
              <label
                htmlFor="firstName"
                className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
              >
                Surname
              </label>
              <input
                className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
                name="firstName"
                ref={register}
              />
            </div>

            <div className="flex flex-col items-center justify-center pt-4">
              <label
                htmlFor="firstName"
                className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
              >
                Email
              </label>
              <input
                className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
                name="firstName"
                ref={register}
              />
            </div>

            {/* <div>
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" placeholder="luo" ref={register} />
                </div>
                
                <div>
                <label htmlFor="email">Email</label>
                <input
                name="email"
                placeholder="bluebill1049@hotmail.com"
                type="email"
                ref={register}
                />
                </div>
                
                <label htmlFor="sector" className="mr-3">
                Sector:
                </label>
                <select
                className="rounded shadow-md"
                name="sector"
                ref={register}
                >
                <option value="Palafour">Palafour</option>
            </select> */}

            <div className="text-center container w-full h-full py-6">
              {submitting ? (
                <div className="pt-4">
                  <h3>Posting Data...</h3>
                  <button
                    className="bg-green-300 p-2 border-gray-900 shadow rounded w-1/2"
                    type="submit"
                    disabled={true}
                  >
                    Submitting
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <button
                    className="bg-green-500 p-2 border-gray-900 shadow rounded w-1/2"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </form>
        </section>
        <GetData />
      </main>
    </>
  );
};

export default SignIn;

export const GetData = (props) => {
  const [item, setItem] = useState({});
  const fetchItem = async () => {
    const fetchItem = await fetch(
      `http://localhost:5000/api/pida/palafour/latest`
    );
    const item = await fetchItem.json();
    setItem(item);
  };
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <>
      <div className="py-3 text-center">
        <div className="text-gray-600 text-muted">
          Registered At:{" "}
          <span className="ml-2 text-gray-700 font-semibold">{item.date}</span>
        </div>
        <div className="text-gray-600 text-muted">
          Current Opening Status:{" "}
          <span className="ml-2 text-gray-700 font-semibold">
            {item.isClosed}
          </span>
        </div>
      </div>
    </>
  );
};
