import { Control, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input, InputProps } from './input';

interface TextFieldProps<TName extends FieldPath<TFieldValues>, TFieldValues extends FieldValues> extends InputProps {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
}

export function TextField<TName extends FieldPath<TFieldValues>, TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  ...props
}: TextFieldProps<TName, TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {fieldState.error && <FormMessage className='text-red-500'>{fieldState.error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
