import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.jpeg";
import Lang from "./Lang";

const SignIn = () => {
  return (
    <>
      <Header />
      <Form />
      <GetData />
    </>
  );
};

export default SignIn;

// Header Component

const Header = () => {
  return (
    <section>
      <div className="container">
        <img src={logo} alt="" />
      </div>
      <div className="container mx-auto px-3">
        <h1 className="text-4xl text-center">Welcome to DC Snowpark Tignes</h1>
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
    </section>
  );
};

// Form Component

export const Form = () => {
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
    if (errors) {
      console.log(errors);
    } else {
      console.log("success, redirect to home page");
    }
    setSubmitting(false);
  };
  return (
    <section className="mt-6 bg-gray-200">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col items-center justify-center mt-4 pt-6">
          <label
            htmlFor="firstName"
            className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
          >
            First Name <span className="font-light text-sm"> (Required)</span>
          </label>
          <input
            className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
            name="firstName"
            ref={register({
              required: "First Name is required.",
              message: "First Name is required.",
            })}
          />
          {errors.firstName && (
            <p className="errorMsg">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center pt-4">
          <label
            htmlFor="surName"
            className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
          >
            Surname <span className="font-light text-sm"> (Required)</span>
          </label>
          <input
            className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
            name="surName"
            ref={register({
              required: "Surname is required.",
              message: "Surname is required.",
            })}
          />
          {errors.surName && (
            <p className="errorMsg">{errors.surName.message}</p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center pt-4">
          <label
            htmlFor="email"
            className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
          >
            Email <span className="font-light text-sm"> (optional)</span>
          </label>
          <input
            className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
            name="email"
            ref={register({
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col items-center justify-center pt-4">
          <label
            htmlFor="instagram"
            className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
          >
            Instagram <span className="font-light text-sm"> (optional)</span>
          </label>
          <input
            className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
            name="instagram"
            ref={register({
              pattern: {
                value: /@^[a-zA-Z0-9._]+$/,
                message: "Instagram Account is not valid.",
              },
            })}
          />
          {errors.instagram && (
            <p className="errorMsg">{errors.instagram.message}</p>
          )}
        </div>

        <div className="flex flex-col items-center justify-center pt-4">
          <label
            htmlFor="consent"
            className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
          >
            Consent <span className="font-light text-sm"> (Required)</span>
            <hr />
            <span className="font-light text-md">
              I hereby declare that I have read and understood the rules to use
              the snowpark
            </span>
          </label>
          <input
            type="checkbox"
            className="rounded shadow-md text-grey-darkest"
            name="consent"
            style={{ width: 40, height: 40, transform: "2.5" }}
            ref={register({
              required: "Consent is required.",
              message: "Consent is required.",
            })}
          />
          {errors.consent && (
            <p className="errorMsg">{errors.consent.message}</p>
          )}
        </div>

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
  );
};

// Fetch Data

export const GetData = (props) => {
  const URL = `http://localhost:5000/api`;
  const [data, setItem] = useState({});
  const fetchItem = async () => {
    const fetchItem = await fetch(URL);
    const data = await fetchItem.json();
    setItem(data);
  };
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="py-3 text-center">
        <div className="text-gray-600 text-muted">
          Registered At:{" "}
          <span className="ml-2 text-gray-700 font-semibold">{data.date}</span>
        </div>
        <div className="text-gray-600 text-muted">
          Current Opening Status:{" "}
          <span className="ml-2 text-gray-700 font-semibold">
            {data.isClosed}
          </span>
        </div>
      </div>
    </>
  );
};
