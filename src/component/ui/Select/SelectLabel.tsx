import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pr-2 text-sm font-semibold', className)}
    {...props}
  >
    {children}
  </SelectPrimitive.Label>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

SelectLabel.propTypes = {
  className: PropTypes.string,
};
