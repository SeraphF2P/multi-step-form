"use client";
import { type } from "os";
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  LegacyRef,
  MutableRefObject,
  ReactNode,
  Ref,
  RefAttributes,
  useEffect,
  useRef,
} from "react";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  onToggle?: string;
  isToggled?: boolean;
  toggleDependencies?: unknown;
  shape?: string;
}
export default forwardRef<
  Ref<MutableRefObject<undefined>> | undefined,
  BtnProps
>(
  (
    {
      onClick,
      onToggle,
      isToggled = undefined,
      toggleDependencies,
      children,
      shape,
      className,
      ...props
    },
    ref
  ) => {
    const ele = useRef(null);
    ref = ele;
    useEffect(() => {
      if (onToggle == undefined || ele.current == undefined) return;
      const btnElement = ele.current as unknown as HTMLButtonElement;
      const classes = onToggle.split(" ").filter((item) => {
        return item != "";
      });
      const classToggler = () => {
        classes.map((str) => {
          btnElement.classList.toggle(str);
        });
      };
      classes.map((str) => {
        btnElement.classList.toggle(str, isToggled);
      });

      btnElement.addEventListener("click", classToggler);

      return () => {
        if (btnElement) {
          btnElement.removeEventListener("click", classToggler);
        }
      };
    }, [isToggled, onToggle, toggleDependencies]);
    const typer = () => {
      if (typeof ele.current != "string") {
        return ref ? ele.current : ele;
      }
    };
    return (
      <button
        ref={ele}
        onClick={(e) => {
          e.stopPropagation();
          if (typeof onClick == "function") {
            onClick();
          }
        }}
        className={`
       ${
         shape == "filled"
           ? " shadow-inherit rounded-full bg-primary-MarineBlue shadow-sm hover:bg-primary-MarineBlue/90 active:bg-primary-MarineBlue/90 active:shadow-inner disabled:bg-neutral-LightGray disabled:text-neutral-coolGray"
           : shape == "outlined"
           ? " border-inherit shadow-inherit rounded-full border-4 border-solid   shadow-sm active:bg-primary-MarineBlue/90 active:shadow-inner  disabled:border-4  disabled:border-solid disabled:border-neutral-LightGray  disabled:text-neutral-coolGray"
           : ""
       }
      ${className}
                   duration-400  transition-transform hover:scale-105  focus:scale-105 active:scale-100 disabled:hover:scale-100
                    `}
        {...props}
      >
        {children}
      </button>
    );
  }
);
