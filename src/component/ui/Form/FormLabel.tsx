import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import PropTypes from 'prop-types';
import { useFormField } from './UseFormField';
import { Label } from '../Label';

import { cn } from '../../../util/css';

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = {
  className: PropTypes.string,
};
