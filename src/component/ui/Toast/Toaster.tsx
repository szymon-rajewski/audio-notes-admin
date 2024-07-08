import * as React from 'react';
import { Toast } from './Toast';
import { ToastClose } from './ToastClose';
import { ToastDescription } from './ToastDescription';
import { ToastProvider } from './ToastProvider';
import { ToastTitle } from './ToastTitle';
import { ToastViewport } from './ToastViewport';
import { useToast } from './UseToast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
