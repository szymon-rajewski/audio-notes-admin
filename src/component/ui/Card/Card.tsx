import * as React from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../../util/css';

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';
Card.propTypes = {
  className: PropTypes.string,
};
