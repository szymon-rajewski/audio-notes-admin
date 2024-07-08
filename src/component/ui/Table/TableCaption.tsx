import * as React from 'react';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

TableCaption.propTypes = {
  className: PropTypes.string,
};
