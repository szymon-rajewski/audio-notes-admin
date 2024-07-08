import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../util/css';

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

AlertTitle.propTypes = {
  className: PropTypes.string,
};
