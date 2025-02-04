import classNames from "classnames";
import React, { forwardRef, Ref } from "react";
import { twMerge } from "tailwind-merge";

type buttonType = {
  [key: string]: string;
};

const buttonSize: buttonType = {
  small: "text-xs",
  medium: "text-base h-46",
  large: "text-lg",
};

const buttonTheme: buttonType = {
  primary: "bg-primary text-white",
  secondary: "hover:bg-gray-400 text-black",
  border: "border border-transparent hover:saturate-10",
};

type ButtonProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  theme?: "primary" | "secondary" | "border";
  // onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: any;
  className?: string;
  full?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = forwardRef(({ children, size = "medium", theme = "primary", className, full, onClick, ...attr }: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      className={classNames(
        twMerge(
          `${buttonTheme[theme]} ${buttonSize[size]} px-10 py-4 box-border cursor-pointer whitespace-pre rounded-4
      `,
          className
        ),
        {
          "w-full": full,
        }
      )}
      onClick={onClick}
      {...attr}
    >
      {children}
    </button>
  );
});
// forwardRef 의 react/display-name 에러 해제
// https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref
Button.displayName = "Button";

export default Button;
