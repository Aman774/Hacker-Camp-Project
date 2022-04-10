import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import urls from '../../shared/urls'


import axios from "axios";

import Styles from "./css/Signup.module.css";

// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()






const ValidatedLoginForm = () => (
  <Formik
    initialValues={{ email: "", password: "", first_name: "", last_name: "" }}
    onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log("Logging in", values);
          setSubmitting(false);
        }, 500);

       console.log("signup url*******",urls)
      axios
        .post(`${urls.baseUrl}${urls.authentication.signUp}`, {
          email: values.email,
          password:values.password,
          first_name: values.first_name,
          last_name:values.last_name
        })
        .then((response) => {
          console.log("response for signup************* ", response);

          toast.success(response.data.message)
        })
        .catch((err) => {
          console.log("error in signup*************",err.response.data.description);
          toast.error(err.response.data.description)
        });
    }}
    //********Using Yum for validation********/

    validationSchema={Yup.object().shape({
      email: Yup.string().email().required("Email is Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum."),
      //     .matches(/(?=.*[0-9])/, "Password must contain a number."),
      first_name: Yup.string().required("first name is required!"),
      last_name: Yup.string().required("last name is required!"),
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
          <h1>Registration</h1>
          <br></br>

          <label htmlFor="first_name" style={{ display: "block" }}>
            first name
          </label>
          <input
            name="first_name"
            type="text"
            placeholder="Enter your first name"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.first_name && touched.first_name && "error"}
          />

          <br></br>
          {errors.first_name && touched.first_name && (
            <div className={Styles.inputFeedback}>{errors.first_name}</div>
          )}

          <label htmlFor="last_name" style={{ display: "block" }}>
            last name
          </label>
          <input
            name="last_name"
            type="text"
            placeholder="Enter your last name"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.last_name && touched.last_name && "error"}
          />

          <br></br>
          {errors.last_name && touched.last_name && (
            <div className={Styles.inputFeedback}>{errors.last_name}</div>
          )}

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
            className={errors.password && touched.password && "error"}
          />

          {errors.password && touched.password && (
            <div className={Styles.inputFeedback}>{errors.password}</div>
          )}

          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
        </form>
      );
    }}
  </Formik>
);

export default ValidatedLoginForm;
