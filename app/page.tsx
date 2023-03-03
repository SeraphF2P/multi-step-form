import { Ubuntu } from "next/font/google";
import axios from "axios";

import FormData from "../context/FormData";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import Image from "next/image";
import FormStep3 from "./FormStep3";
import Confirm from "./Confirm";
import ThankYou from "./ThankYou";
import Steps from "./Steps";
import TheTostifier from "./TheTostifier";
import SlideInDiv from "./SlideInDiv";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});
export default async function Home() {
  const plans = await axios.get("http://localhost:3000/api/plans");
  const addOns = await axios.get("http://localhost:3000/api/add-ons");
  const formsSteps = [
    <FormStep1 />,
    <FormStep2 plans={plans.data} />,
    <FormStep3 addOns={addOns.data} />,
    <Confirm plans={plans.data} addOns={addOns.data} />,
    <ThankYou />,
  ];
  return (
    <main
      className={` ${ubuntu.variable} relative h-screen w-full   items-center justify-center bg-neutral-LightGray font-ubuntu md:flex`}
    >
      <TheTostifier />
      <section className=" relative z-10 grid h-full w-full  max-w-screen-md overflow-hidden md:m-auto md:flex md:h-[500px] md:items-center md:gap-4  md:rounded md:bg-neutral-white md:p-4  ">
        <Image
          className=" absolute top-0 left-0 -z-10 w-full [aspect-ratio:375/172;]  md:hidden "
          src={"/bg-sidebar-mobile.svg"}
          width={375}
          height={172}
          alt="background image"
          priority
        />
        <div className="relative hidden h-full w-1/3 md:flex  ">
          <Image
            className=" absolute top-0 left-0 -z-10   h-full w-full  "
            src={"/bg-sidebar-desktop.svg"}
            width={172}
            height={375}
            alt="background image"
            priority
          />
        </div>
        <div className=" top-0 right-0 h-full   md:w-2/3">
          <FormData
            formsSteps={formsSteps.map((step, index) => {
              return <SlideInDiv key={index}>{step}</SlideInDiv>;
            })}
          >
            <Steps numOfSteps={4} />
            <div className="fixed bottom-0 left-0 h-20 w-full bg-neutral-white md:hidden"></div>
          </FormData>
        </div>
      </section>
    </main>
  );
}
