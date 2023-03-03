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
    useEffect(() => {
      if (onToggle == undefined || ele.current == undefined) return;
      ref = ele.current;
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
           ? " bg-light-primary hover:bg-light-hover active:bg-light-active disabled:bg-light-muted disabled:text-muted shadow-inherit rounded-full shadow-sm active:shadow-inner"
           : shape == "outlined"
           ? " disabled:border-light-muted active:bg-light-active disabled:text-muted border-inherit shadow-inherit   rounded-full border-4 border-solid  shadow-sm  active:shadow-inner disabled:border-4  disabled:border-solid"
           : ""
       }
      ${className}
                   duration-400  transition-transform hover:scale-105 active:scale-100 disabled:hover:scale-100
                    `}
        {...props}
      >
        {children}
      </button>
    );
  }
);
