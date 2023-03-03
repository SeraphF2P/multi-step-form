"use client";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Cycle, useCycle, motion as m } from "framer-motion";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { slideIn } from "../components/framer-motion";
import { Switch } from "@headlessui/react";
import { useFormData } from "../context/FormData";
import FormBtns from "./FormBtns";

function switchBtn(
  subscription: string,
  cycleSubscription: Cycle,
  setFieldValue: {
    (field: string, value: any, shouldValidate?: boolean | undefined): void;
    (arg0: string, arg1: boolean): void;
  }
) {
  return (
    <Switch.Group
      as="div"
      className=" flex items-center justify-center gap-4 rounded bg-neutral-mangolia p-2 px-16"
    >
      <Switch.Description
        className={`${
          subscription == "monthly"
            ? " text-primary-MarineBlue"
            : "text-neutral-LightGray"
        }`}
      >
        Monthly
      </Switch.Description>
      <Field name="subscription">
        {({ field }: { field: any }) => {
          return (
            <Switch
              checked={subscription == "yearly"}
              {...field}
              onChange={(value) => {
                cycleSubscription();
                setFieldValue("subscription", value ? "yearly" : "monthly");
              }}
              className={` relative inline-flex h-[38px]
          w-[74px] shrink-0 border-spacing-4 scale-50 cursor-pointer rounded-full border-2 border-transparent bg-primary-MarineBlue p-1  duration-200 ease-in-out focus:outline-none focus-visible:ring-4   focus-visible:ring-primary-PurplishBlue focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">subscription</span>
              <span
                aria-hidden="true"
                className={`${
                  subscription == "yearly" ? "translate-x-9" : "translate-x-0"
                }
            pointer-events-none inline-block h-[28px] w-[28px] transform rounded-full bg-neutral-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          );
        }}
      </Field>

      <Switch.Description
        className={`${
          subscription == "yearly"
            ? " text-primary-MarineBlue"
            : "text-neutral-LightGray"
        }`}
      >
        Yearly
      </Switch.Description>
    </Switch.Group>
  );
}
export default ({ plans }: { plans: any }) => {
  const { data, setData } = useFormData();
  const [subscription, cycleSubscription] = useCycle("monthly", "yearly");
  const ValidationSchema = Yup.object().shape({
    plan: Yup.string().required("Please select an option"),
    subscription: Yup.string().required("subscription is required"),
  });

  return (
    <Formik
      initialValues={data}
      validationSchema={ValidationSchema}
      onSubmit={setData}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-2 p-2 md:h-full md:justify-start">
          <RadioGroup
            className={"flex flex-col  gap-2"}
            value={values.plan}
            onChange={(value) => {
              setFieldValue("plan", value);
            }}
            name="plan"
          >
            <div className=" prose">
              <RadioGroup.Label
                as="h2"
                className="relative  mb-0 text-primary-MarineBlue "
              >
                Select your plan
              </RadioGroup.Label>
              <p className="text-neutral-coolGray">
                you have the option of monthly or yearly billing
              </p>
            </div>
            <div className="relative flex flex-col gap-2 md:flex-row md:justify-between">
              {plans.map(
                (plan: {
                  id: string;
                  src: string;
                  name: string;
                  pricing: {
                    monthly: number | string;
                    yearly: number | string;
                  };
                }) => (
                  <RadioGroup.Option
                    className={`w-full`}
                    key={plan.id}
                    value={plan.id}
                  >
                    {({ checked, active }) => {
                      return (
                        <div
                          className={`${
                            active || checked
                              ? " border-primary-PurplishBlue"
                              : ""
                          }
                        flex items-center gap-2 rounded-md border border-solid border-neutral-LightGray p-2 md:w-full md:flex-col 
                  md:items-start md:gap-8 md:p-4`}
                        >
                          <Image
                            src={plan.src}
                            width={32}
                            height={32}
                            alt={plan.name}
                          />
                          <div>
                            <h2 className=" font-bold text-primary-MarineBlue">
                              {plan.name}
                            </h2>
                            <p className="text-xs  text-neutral-coolGray">
                              $
                              {
                                plan.pricing[
                                  subscription as keyof typeof plan.pricing
                                ]
                              }
                              {subscription == "monthly" ? "/mo" : "/yr"}
                            </p>
                          </div>
                        </div>
                      );
                    }}
                  </RadioGroup.Option>
                )
              )}
              <div className=" absolute  -top-20 right-0 h-20 w-full">
                <div className=" relative h-8">
                  <ErrorMessage
                    component="div"
                    className="form-error top-0 "
                    name="plan"
                  />
                </div>
                <div className=" relative h-8">
                  <ErrorMessage
                    component="div"
                    className="form-error inset-auto bottom-0 "
                    name={"subscription"}
                  />
                </div>
              </div>
            </div>
          </RadioGroup>
          <FormBtns values={values} />
          {switchBtn(subscription, cycleSubscription, setFieldValue)}
        </Form>
      )}
    </Formik>
  );
};
