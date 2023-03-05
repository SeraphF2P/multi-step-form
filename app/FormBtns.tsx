import React, { useRef } from "react";
import Btn from "../components/Btn";
import { useFormData } from "../context/FormData";

export default ({
  values,
  onSubmit,
  isSubmiting,
}: {
  values?: any;
  onSubmit?: any;
  isSubmiting?: boolean;
}) => {
  const { prevForm, currentFormIndex } = useFormData();
  const ref = useRef(null);
  return (
    <div className=" fixed bottom-0  right-0 grid h-20 w-full grid-cols-2 gap-x-24 bg-neutral-white md:absolute md:right-0 ">
      {currentFormIndex && currentFormIndex != 0 ? (
        <Btn
          type="button"
          onClick={() => {
            prevForm(values);
          }}
          className=" m-auto rounded px-4  py-2 font-bold text-neutral-LightGray hover:text-primary-MarineBlue"
        >
          Go back
        </Btn>
      ) : (
        ""
      )}
      <Btn
        type="submit"
        ref={ref}
        onClick={() => {
          onSubmit && onSubmit();
        }}
        disabled={isSubmiting}
        shape="filled"
        className={`${
          onSubmit && "bg-primary-PurplishBlue"
        }   col-start-2 m-auto !rounded bg-primary-MarineBlue px-4 py-2 text-neutral-albaster`}
      >
        {onSubmit ? "confirm" : "Next Step"}
      </Btn>
    </div>
  );
};
