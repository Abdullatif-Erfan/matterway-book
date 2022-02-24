import React from "react";
type ButtonProps = {
  variant: "primary" | "secondary";
  children: string;
} & React.ComponentProps<"button">;

function CustomButton({ variant, children, ...rest }: ButtonProps) {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  );
}

export default CustomButton;
