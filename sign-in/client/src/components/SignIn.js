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
    </>
  );
};

// Header Component

const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="mx-3">
      <div className="flex items-center justify-center">
        <img src={logo} alt="" />
      </div>
      <div className="container mx-auto px-3">
        <h1 className="text-4xl text-center">{t("title")}</h1>
      </div>
      <div className="py-6">
        <Lang />
      </div>
      <GetData />
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
        <h2 className="text-lg text-center font-light py-3">
          {t("rules.part4")}
        </h2>
        <h2 className="text-lg text-center font-light py-3">
          {t("rules.part5")}
        </h2>
        <h2 className="text-lg text-center font-light py-3">
          {t("rules.part6")}
        </h2>
        <h2 className="text-lg text-center font-light py-3">
          {t("rules.part7")}
        </h2>
      </div>
      <div className="text-center py-3">
        <Modal />
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

  // const [firstName, setFirstName] = useLocalStorage("first_name", "");
  // const [surName, setSurName] = useLocalStorage("second_name", "");
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
    const response = await fetch("https://dcparktignes.com/api/park/create", {
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
    window.location.reload();

    if (isSubmitted) {
      console.log("Form Posted");
    }
  };

  return (
    <section className="bg-gray-200">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col items-center justify-center pt-6">
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
            // value={firstName}
            // onChange={(e) => {
            //   setFirstName(e.target.value);
            // }}
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
            // value={surName}
            // onChange={(e) => {
            //   setSurName(e.target.value);
            // }}
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
  const { t, i18n } = useTranslation();
  const id = localStorage.getItem("id");
  let parsedId;
  if (localStorage.getItem("id") === null) {
    parsedId = "2345";
  } else {
    parsedId = id.slice(1, -1);
  }
  const URL = `https://dcparktignes.com/api/park/${parsedId}`;
  console.log(parsedId);
  const [data, setItem] = useState({});
  const fetchItem = async () => {
    const fetchItem = await fetch(URL);
    const data = await fetchItem.json();
    setItem(data);
  };
  useEffect(() => {
    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let RegistrationStatus;
  if (data.isRegistered === "false" || "") {
    RegistrationStatus = (
      <>
        <h1 className="text-grey-900 font-normal text-2xl">
          Hi {data.first_name}
          <br /> <span className="pb-6 px-4">{t("title")}</span>
        </h1>
        <h1 className="text-xl text-red-500">{t("registrationStatus.1")}</h1>
      </>
    );
  } else if (data.isRegistered === "true") {
    RegistrationStatus = (
      <>
        <h1 className="text-grey-900 font-normal text-2xl">
          Hi {data.first_name}
          <br /> <span className="pt-6 px-4">{t("title")}</span>
        </h1>
        <h1 className="text-xl pt-6 px-4 text-green-500">
          {t("registrationStatus.2")}
        </h1>
      </>
    );
  }
  let NoId;
  if (!data.first_name) {
    NoId = (
      <h1 className="text-grey-900 font-normal text-2xl">
        {t("title")}
        <br />
        <h2 className="text-red-500 pt-6 px-4 text-xl">
          {t("registrationStatus.1")}
        </h2>
      </h1>
    );
  } else if (data.firstName) {
    NoId = <h1 className="text-green-500">Hi {data.first_name}</h1>;
  }

  return (
    <>
      <div className="bg-gray-100 py-6 min-w-full text-center border border-gray-300 rounded shadow">
        <div className="">
          <span className="">{NoId}</span>
          <span className="">{RegistrationStatus}</span>
        </div>
      </div>
    </>
  );
};

function Modal() {
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => setShowModal(true)}
      >
        {t("gdpr.button")}
      </button>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl font-semibold">{t("gdpr.button")}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-gray-600 text-xs leading-relaxed">
                    {t("gdpr.1")}
                    <br />
                    {t("gdpr.2")}
                    <br />
                    {t("gdpr.3")}
                    <br />
                    {t("gdpr.4")}
                    <br />
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
