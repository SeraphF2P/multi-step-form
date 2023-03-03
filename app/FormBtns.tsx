import React from "react";
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
  return (
    <div className=" fixed md:absolute  bottom-0 right-0 grid h-20 w-full grid-cols-2 gap-x-24 bg-neutral-white md:right-0 ">
      {currentFormIndex && currentFormIndex != 0 ? (
        <Btn
          type="button"
          onClick={() => {
            prevForm(values);
          }}
          className=" m-auto rounded hover:text-primary-MarineBlue  px-4 py-2 font-bold text-neutral-LightGray"
        >
          Go back
        </Btn>
      ) : (
        ""
      )}
      <Btn
        type="submit"
        onClick={() => {
          onSubmit && onSubmit();
        }}
        disabled={isSubmiting}
        className={`${
          onSubmit && "bg-primary-PurplishBlue"
        }   col-start-2 m-auto rounded bg-primary-MarineBlue px-4 py-2 text-neutral-albaster`}
      >
        {onSubmit ? "confirm" : "Next Step"}
      </Btn>
    </div>
  );
};
