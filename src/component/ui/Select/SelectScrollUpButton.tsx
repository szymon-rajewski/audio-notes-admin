import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import PropTypes from 'prop-types';
import { ChevronUp } from 'lucide-react';

import { cn } from '../../../util/css';

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

SelectScrollUpButton.propTypes = {
  className: PropTypes.string,
};
