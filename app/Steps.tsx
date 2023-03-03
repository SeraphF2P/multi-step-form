"use client";
import React from "react";
import { useFormData } from "../context/FormData";

const steps = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];
function Steps({ numOfSteps }: { numOfSteps: number }) {
  const { currentFormIndex } = useFormData();

  const emtyArray = Array(numOfSteps).fill(1);
  return (
    <div className="absolute top-0 left-0 z-10  flex h-20 w-full items-center justify-center p-2 md:mt-8 md:h-full md:w-1/3    md:flex-col   md:justify-start ">
      <div className=" flex items-center justify-center  md:justify-start gap-2 md:w-full md:flex-col  md:gap-4 ">
        {steps &&
          steps.map((name, index) => {
            return (
              <div className=" items-center gap-2  md:px-8 md:flex md:w-full ">
                <div
                  key={index}
                  className={`${
                    currentFormIndex == index
                      ? "bg-primary-PastelBlue text-primary-MarineBlue"
                      : "text-neutral-white"
                  } 
                relative flex h-9 w-9
                items-center justify-center
                  rounded-full border  border-solid border-neutral-white  `}
                >
                  <span className={`font-bold `}>{index + 1}</span>
                </div>
                <div className=" prose m-0 hidden flex-col  md:flex">
                  <p className=" m-0 text-sm text-neutral-LightGray">
                    STEP {index + 1}
                  </p>
                  <h2 className=" m-0 text-sm font-bold capitalize text-neutral-white ">
                    {name}
                  </h2>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Steps;
