import * as React from 'react';
import PropTypes from 'prop-types';

import { cn } from '../../../util/css';

export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

DropdownMenuShortcut.propTypes = {
  className: PropTypes.string,
};
