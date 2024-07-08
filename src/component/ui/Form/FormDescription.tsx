import React from 'react';
import { useFormField } from './UseFormField';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

FormDescription.propTypes = {
  className: PropTypes.string,
};
