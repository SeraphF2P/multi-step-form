"use client";
import {
  createContext,
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useCycle, AnimatePresence, Cycle } from "framer-motion";
type dataProps = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  subscription: string;
  addOns: string[];
};
const Data = createContext<dataProps>({
  name: "",
  email: "",
  phone: "",
  plan: "",
  subscription: "",
  addOns: [],
});

const SetData = createContext<Dispatch<SetStateAction<dataProps | undefined>>>(
  () => {}
);
const CurrentFormIndex = createContext<number>(0);
const CycleForm = createContext<Cycle>(() => {});
const PrevForm = createContext<Dispatch<SetStateAction<dataProps>>>(() => {});
function useFormData() {
  const data = useContext(Data);
  const setData = useContext(SetData);
  const currentFormIndex = useContext(CurrentFormIndex);
  const prevForm = useContext(PrevForm);
  const cycleForm = useContext(CycleForm);
  return { data, setData, currentFormIndex, prevForm, cycleForm };
}
const FormData = (props: {
  formsSteps: JSX.Element[];
  children: ReactNode;
}) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    subscription: "",
    addOns: [],
  });
  const [currentForm, cycleForm] = useCycle(...props.formsSteps);
  function next(values: any) {
    let index = currentForm.key ? +currentForm.key : props.formsSteps.length;
    if (index + 1 == props.formsSteps.length) return;
    console.log(data);
    setData((prev) => {
      return { ...prev, ...values };
    });

    cycleForm(index + 1);
  }
  function prev(values: any) {
    let index = currentForm.key ? +currentForm.key : 0;
    if (index == 0) return;
    setData((prev) => {
      return { ...prev, ...values };
    });
    console.log(data);
    cycleForm(index - 1);
  }

  return (
    <Data.Provider value={data}>
      <SetData.Provider value={next}>
        <CurrentFormIndex.Provider
          value={currentForm.key ? +currentForm.key : 0}
        >
          <PrevForm.Provider value={prev}>
            <CycleForm.Provider value={cycleForm}>
              {props.children}
              <AnimatePresence initial={false} mode="wait">
                {currentForm}
              </AnimatePresence>
            </CycleForm.Provider>
          </PrevForm.Provider>
        </CurrentFormIndex.Provider>
      </SetData.Provider>
    </Data.Provider>
  );
};

export { FormData, useFormData };
export default FormData;
