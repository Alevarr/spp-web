import { Ref, forwardRef, useState } from "react";

import { Input, InputProps } from "@nextui-org/react";
import { EyeFilledIcon } from "./icons/EyeFilled.icon";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilled.icon";

const PasswordInput = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <Input
        ref={ref}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
