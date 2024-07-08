import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
SelectSeparator.propTypes = {
  className: PropTypes.string,
};
