import * as React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../util/css';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

AlertDescription.propTypes = {
  className: PropTypes.string,
};
