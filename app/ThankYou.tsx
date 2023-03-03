"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useFormData } from "../context/FormData";

function ThankYou() {
  const { cycleForm } = useFormData();
  useEffect(() => {
    setTimeout(() => {
      cycleForm(0);
    }, 6000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Image
        width={40}
        height={40}
        src="/icon-thank-you.svg"
        alt={"thank you icon"}
      />
      <div className="prose text-center">
        <h2 className="mb-0">Thank you!</h2>
        <p className=" text-neutral-LightGray">
          Thank you! Thanks for confirming your subscription! We hope you have
          fun using our platform. If you ever need support, please feel free to
          email us at support@loremgaming.com.
        </p>
      </div>
    </div>
  );
}

export default ThankYou;
