import * as React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../util/css';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';
CardContent.propTypes = {
  className: PropTypes.string,
};
