import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

 const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const { control } = useForm({ defaultValues: { a: '123' } });
  const [count, setCount] = useState(0);
  React.useEffect(() => {
    console.log('Button mounted');

  }, []);
  const mode = primary ? 'demo-button--primary' : 'demo-button--secondary';
  return (
    <form>

    <Controller name="a" control={control} render={({ field }) => <input {...field} />}></Controller>
    </form>

  );
};


export default Button;