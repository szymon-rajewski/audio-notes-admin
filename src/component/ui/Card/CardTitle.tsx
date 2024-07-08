import * as React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../util/css';

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';
CardTitle.propTypes = {
  className: PropTypes.string,
};
