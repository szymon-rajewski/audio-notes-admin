import * as React from 'react';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

TableHeader.propTypes = {
  className: PropTypes.string,
};
