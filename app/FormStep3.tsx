"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion as m } from "framer-motion";
import { slideIn } from "../components/framer-motion";
import { useFormData } from "../context/FormData";
import FormBtns from "./FormBtns";
import { Switch } from "@headlessui/react";
import { HiCheck } from "react-icons/hi";
type addOnsProps = {
  [key: string]: [
    {
      name: string;
      description: string;
      price: number;
    },
    {
      name: string;
      description: string;
      price: number;
    }
  ];
};
export default ({ addOns }: { addOns: addOnsProps }) => {
  const { data, setData } = useFormData();

  const ValidationSchema = Yup.object().shape({
    addOns: Yup.array().of(Yup.string().required("This field is required")),
  });

  return (
    <Formik
      validationSchema={ValidationSchema}
      initialValues={data}
      onSubmit={setData}
    >
      {({ values, setFieldValue }) => (
        <Form className=" flex flex-col gap-4">
          <div className=" prose">
            <h2 className="relative  mb-0 text-primary-MarineBlue ">
              Pick add-ons
            </h2>
            <p className="text-neutral-coolGray">
              Add-ons help enhance your gaming experience.
            </p>
          </div>

          {addOns &&
            addOns[data.subscription].map(
              ({
                name,
                description,
                price,
              }: {
                name: string;
                description: string;
                price: number;
              }) => {
                return (
                  <div
                    key={name}
                    className=" flex h-16 items-center justify-between rounded-md border border-solid border-neutral-LightGray p-2 px-4"
                  >
                    <Field name="addOns">
                      {({ field }: { field: any }) => {
                        return (
                          <Switch
                            {...field}
                            className={`${
                              values.addOns.includes(name)
                                ? "bg-primary-PurplishBlue"
                                : "bg-primary-white"
                            } grid h-6 w-6  rounded border border-solid border-neutral-LightGray `}
                            checked={field.value.includes(name)}
                            value={name}
                            onChange={() => {
                              let index = values.addOns.findIndex((ind) => {
                                return ind == name;
                              });
                              if (index == -1) {
                                setFieldValue("addOns", [
                                  ...values.addOns,
                                  name,
                                ]);
                              } else {
                                setFieldValue("addOns", [
                                  ...values.addOns.slice(0, index),
                                  ...values.addOns.slice(index + 1),
                                ]);
                              }
                            }}
                          >
                            {({ checked }) => {
                              return (
                                checked && (
                                  <HiCheck
                                    size={19}
                                    className="m-auto text-neutral-white"
                                  />
                                )
                              );
                            }}
                          </Switch>
                        );
                      }}
                    </Field>
                    <ErrorMessage name="addOns" />
                    <div className="prose flex w-44 flex-col p-2">
                      <h2 className=" m-0 text-xs   font-bold text-primary-MarineBlue">
                        {name}
                      </h2>
                      <p className=" text-xs text-neutral-LightGray ">
                        {description}
                      </p>
                    </div>
                    <div className=" text-xs text-primary-PurplishBlue ">
                      {`+$${price}/${data.subscription.slice(0, 2)}`}
                    </div>
                  </div>
                );
              }
            )}

          <FormBtns values={values} />
        </Form>
      )}
    </Formik>
  );
};
