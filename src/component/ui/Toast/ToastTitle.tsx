import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

ToastTitle.propTypes = {
  className: PropTypes.string,
};
