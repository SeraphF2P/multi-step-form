"use client";
import Btn from "../components/Btn";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { motion as m } from "framer-motion";
import { slideIn } from "../components/framer-motion";
import { useFormData } from "../context/FormData";
import FormBtns from "./FormBtns";

export default () => {
  const { data, setData } = useFormData();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "name can't be less than 3 character")
      .required("name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.number()
      .min(6, "write your full number")
      .required("Phone Number is required"),
  });

  return (
    <>
      <Formik
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={setData}
      >
        {() => (
          <Form className=" flex  flex-col md:w-96 gap-4 md:h-full ">
            <div className=" prose">
              <h2 className="mb-0  text-primary-MarineBlue ">Personal info</h2>
              <p className="text-neutral-coolGray">
                Please provide your name,email address, and phone number
              </p>
            </div>
            <div className=" relative w-full">
              <label
                className=" text-sm font-bold text-primary-MarineBlue"
                htmlFor="name"
              >
                Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className=" form-field"
                placeholder="e.g.Stephen King"
                autoComplete="true"
              />
              <ErrorMessage
                component="div"
                className="form-error"
                name="name"
              />
            </div>
            <div className=" relative w-full">
              <label
                className=" text-sm font-bold text-primary-MarineBlue"
                htmlFor="email"
              >
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className=" form-field"
                placeholder="e.g.stephenking@lorem.com"
                autoComplete="true"
              />
              <ErrorMessage
                component="div"
                className="form-error"
                name="email"
              />
            </div>
            <div className=" relative w-full">
              <label
                className=" text-sm font-bold text-primary-MarineBlue"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <Field
                type="number"
                name="phone"
                id="phone"
                className=" form-field"
                placeholder="e.g. +1 234 567 890"
                autoComplete="true"
              />
              <ErrorMessage
                component="div"
                className="form-error"
                name="phone"
              />
            </div>
            <FormBtns />
          </Form>
        )}
      </Formik>
    </>
  );
};
