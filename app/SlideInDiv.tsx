"use client";
import { motion as m } from "framer-motion";
import { ReactNode } from "react";
import { slideIn } from "../components/framer-motion";

export default ({ children }: { children: ReactNode }) => {
  return (
    <m.div
      variants={slideIn}
      initial="hidden"
      animate="show"
      exit="exit"
      className="  flex h-screen w-full   flex-col items-center   justify-center md:h-full   "
    >
      <div
        className=" 
        relative m-auto mt-[26%]  flex w-80 flex-col gap-4  rounded-md bg-neutral-white p-4 
        xxsm:mt-[20%] md:m-0  md:h-full md:w-full md:items-center md:justify-center md:pb-10"
      >
        {children}
      </div>
    </m.div>
  );
};
