import * as React from 'react';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

TableBody.propTypes = {
  className: PropTypes.string,
};
