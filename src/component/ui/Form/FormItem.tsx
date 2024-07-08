import * as React from 'react';
import PropTypes from 'prop-types';
import { FormItemContext } from './FormItemContext';

import { cn } from '../../../util/css';

export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

FormItem.propTypes = {
  className: PropTypes.string,
};
