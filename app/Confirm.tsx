"use client";

import { motion as m } from "framer-motion";
import { slideIn } from "../components/framer-motion";
import { useFormData } from "../context/FormData";
import FormBtns from "./FormBtns";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
export default ({ plans, addOns }: { plans: any; addOns: any }) => {
  const { data, cycleForm } = useFormData();
  const [isSubmiting, setSubmitting] = useState(false);
  const confirmSubmitHandeler = () => {
    setSubmitting(true);
    setTimeout(() => {
      cycleForm();
      setSubmitting(false);
      toast.success("subscribed successfully");
    }, 1000);
    // try {
    //   setSubmitting(true);
    //   let res = await axios.post(`https://multi-step-form-eok7-mtinhuwg4-seraphf2p.vercel.app/api/confirm`, data);
    //   if (res.status === 200) {
    //     if (res.data.success === 1) {
    //       toast.success(res.data.msg);
    //     } else {
    //       toast.warn(res.data.msg);
    //     }
    //   }
    //   console.log(res);
    // } catch (error) {
    //   console.error(error);
    //   toast.error(res.data.msg);
    // } finally {
    //   setSubmitting(false);
    // }
  };

  const [recipe, setRecipe] = useState<{
    planName: string;
    price: number;
    added: any[] | undefined;
    totalPrice: number;
  }>({
    planName: "",
    price: 0,
    added: [],
    totalPrice: 0,
  });
  useEffect(() => {
    const chosenPlan = plans.find((i: { id: any }) => {
      return i.id == data.plan;
    });
    const planName = chosenPlan.name;
    const price = chosenPlan.pricing[data.subscription];
    const added = addOns[data.subscription].filter((i: { name: string }) => {
      return data.addOns.includes(i.name);
    });
    const totalPrice = added.reduce(
      (accumulator: number, currentValue: { price: number }) => {
        return (accumulator += currentValue.price);
      },
      price
    );
    setRecipe({ planName, price, added, totalPrice });
  }, [data]);

  return (
    <>
      <div>
        <div className=" prose ">
          <h2 className="mb-0  text-primary-MarineBlue ">Finishing up</h2>
          <p className=" text-neutral-coolGray">
            Double-check everything looks OK before confirming.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className=" w-full rounded  bg-neutral-mangolia  px-4">
          <div className=" flex items-center justify-between border-b border-solid border-b-neutral-LightGray py-4">
            <div className=" prose  ">
              <h4 className="mb-0  font-bold text-primary-MarineBlue ">
                {`${recipe.planName}(${data.subscription})`}
              </h4>
              <p
                onClick={() => {
                  cycleForm(1);
                }}
                className="cursor-pointer text-neutral-coolGray underline hover:text-primary-PurplishBlue"
              >
                Change
              </p>
            </div>
            <span className=" font-bold text-primary-MarineBlue">{`$${
              recipe.price
            }/${data.subscription.slice(0, 2)}`}</span>
          </div>
        </div>
        <div>
          {recipe.added &&
            recipe.added.map((add: { name: string; price: any }) => {
              return (
                <div
                  key={add.name}
                  className="flex items-center justify-between bg-neutral-mangolia  px-4 py-2 text-sm"
                >
                  <p className="text-neutral-coolGray ">{add.name}</p>
                  <span className=" text-primary-MarineBlue">{`+$${
                    add.price
                  }/${data.subscription.slice(0, 2)}`}</span>
                </div>
              );
            })}
        </div>
        <div className=" flex w-full items-center justify-between p-4">
          <p className="text-neutral-coolGray">Total (per month)</p>
          <span className=" font-bold text-primary-PurplishBlue">{`+$${
            recipe.totalPrice
          }/${data.subscription.slice(0, 2)}`}</span>
        </div>
      </div>

      <FormBtns onSubmit={confirmSubmitHandeler} isSubmiting={isSubmiting} />
    </>
  );
};
