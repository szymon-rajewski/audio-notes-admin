import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

ToastDescription.propTypes = {
  className: PropTypes.string,
};
