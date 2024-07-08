import * as React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../util/css';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
CardFooter.propTypes = {
  className: PropTypes.string,
};
