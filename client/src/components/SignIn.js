import React, { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../hooks/useLocalStorage";
import logo from "../assets/logo.jpeg";
import Lang from "./Lang";
import { useTranslation } from "react-i18next";

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <SignIn />
    </Suspense>
  );
}

const SignIn = () => {
  return (
    <>
      <Header />
      <Form />
      <GetData />
    </>
  );
};

// Header Component

const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <section>
      <div className="flex items-center justify-center">
        <img src={logo} alt="" />
      </div>
      <div className="container mx-auto px-3">
        <h1 className="text-4xl text-center">{t("title")}</h1>
      </div>
      <div className="py-6">
        <Lang />
      </div>
      <div className="container mx-auto">
        <h1 className="text-xl text-center font-medium py-3">
          {t("rules.part1")}
        </h1>
        <h2 className="text-lg text-center font-light py-3">
          {t("rules.part2")}
        </h2>
        <h2 className="text-lg text-center font-light py-3">
          {t("rules.part3")}
        </h2>
      </div>
    </section>
  );
};

// Form Component

export const Form = () => {
  const { t, i18n } = useTranslation();
  const newDate = new Date();
  const formData = {
    defaultValues: {
      first_name: "",
      second_name: "",
      isRegistered: "",
      email: "",
      instagram: "",
      date: newDate.toLocaleString(),
    },
  };

  const [firstName, setFirstName] = useLocalStorage("first_name", "");
  const [surName, setSurName] = useLocalStorage("second_name", "");
  const [id, setId] = useLocalStorage("id", "");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, errors, formState } = useForm({
    formData,
    mode: "onChange",
  });
  const { isSubmitted } = formState;

  const submitForm = async (formData, e) => {
    e.target.reset();
    setSubmitting(true);
    const response = await fetch("http://localhost:5000/api/park/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.firstName,
        second_name: formData.surName,
        email: formData.email,
        instagram: formData.instagram,
        isRegistered: formData.consent,
        date: newDate.toLocaleString(),
      }),
    });
    const data = await response.json();
    if (errors) {
      console.log(errors);
    } else {
      console.log("success, redirect to home page");
    }
    setSubmitting(false);
    console.log(data._id);
    setId(data._id);
    if (isSubmitted) {
      console.log("Form Submitted");
    }
  };

  return (
    <section className="mt-6 bg-gray-200">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col items-center justify-center mt-4 pt-6">
          <label
            htmlFor="firstName"
            className="text-center mb-2 uppercase font-bold text-lg text-grey-darkest"
          >
            {t("form.firstName")}{" "}
            <span className="font-light text-sm"> ({t("form.required")})</span>
          </label>
          <input
            className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
            name="firstName"
            ref={register({
              required: "First Name is required.",
              message: "First Name is required.",
            })}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
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
            {t("form.secondName")}{" "}
            <span className="font-light text-sm"> ({t("form.required")})</span>
          </label>
          <input
            className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
            name="surName"
            ref={register({
              required: "Surname is required.",
              message: "Surname is required.",
            })}
            value={surName}
            onChange={(e) => {
              setSurName(e.target.value);
            }}
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
            Email{" "}
            <span className="font-light text-sm"> ({t("form.optional")})</span>
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
            Instagram{" "}
            <span className="font-light text-sm"> ({t("form.optional")})</span>
          </label>
          <input
            className="rounded shadow-md w-3/4 border py-2 px-3 text-grey-darkest"
            name="instagram"
            ref={register({})}
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
            {t("form.consent")}{" "}
            <span className="font-light text-sm"> ({t("form.required")})</span>
            <hr />
            <span className="font-light text-md">{t("form.consentText")}</span>
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
                {t("form.submit")}
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
  const URL = `http://localhost:5000/api/park`;
  const [data, setItem] = useState({});
  const fetchItem = async () => {
    const fetchItem = await fetch(URL);
    const data = await fetchItem.json();
    setItem(data);
    console.log(data);
  };
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
