import { Control, FieldPath } from "react-hook-form";
import { z, ZodType } from "zod";

import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { HTMLInputTypeAttribute } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface CustomFormProps<T extends ZodType<any, any>> {
  control: Control<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  formSchema: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomInput<T extends ZodType<any, any>>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formSchema,
}: CustomFormProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>

          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
}
