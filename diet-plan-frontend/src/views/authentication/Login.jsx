import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import Styles from "./css/Login.module.css";
import axios from "axios";
import urls from "../../shared/urls";

// Importing toastify module
import { toast } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.
toast.configure();
// import axios from "../../shared/axios";

const handleLogin = (values) => {
  console.log(values);

  console.log("***login urls*******", urls.baseUrl, urls.authentication.login);

  axios
    .post(`${urls.baseUrl}${urls.authentication.login}`, {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      console.log("login resp--", response);
      console.log("user_info ", response.data.data);
      localStorage.setItem(
        "user_info",
        JSON.stringify(response.data.data.userinfo)
      );
      console.log(JSON.parse(localStorage.getItem("user_info")));

      // console.log(JSON.parse(localStorage.getItem("user_info")).active);

      toast.success(response.data.data.message);
    })
    .catch((err) => {
      console.log(err.response.data.description);
      toast.error(err.response.data.description);
    });
};

const login = (props) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
      console.log("values--", values);
      // axios
      //   .post(`${urls.baseUrl}${urls.authentication.login}`, {
      //     email: values.email,
      //     password: values.password,

      //   })
      //   .then((response) => {
      //     console.log("login resp--", response);
      //     console.log("user_info ", response.data.userInfo);
      //     localStorage.setItem("user_info", JSON.stringify(response.data.userInfo));
      //     // console.log(JSON.parse(localStorage.getItem("user_info")));

      //     // console.log(JSON.parse(localStorage.getItem("user_info")));

      //     toast.success(response.data.message)

      //     props.history.push("/home");
      //   })
      //   .catch((err) => {
      //     console.log(err.response.data.description);
      //     toast.error(err.response.data.description)
      //   });
    }}
    //********Using Yum for validation********/

    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
      // .matches(/(?=.*[0-9])/, "Password must contain a number."),
      role: Yup.string().required("role is required!"),
    })}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <br></br>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && Styles.error}
          />
          {errors.email && touched.email && (
            <div className={Styles.inputFeedback}>{errors.email}</div>
          )}
          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && Styles.error}
          />
          {errors.password && touched.password && (
            <div className={Styles.inputFeedback}>{errors.password}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            onClick={() => handleLogin(values)}
          >
            Login
          </button>
        </form>
      );
    }}
  </Formik>
);

export default login;
