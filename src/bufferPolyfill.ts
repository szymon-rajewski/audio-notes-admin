import { Buffer } from 'buffer';

if (typeof window !== 'undefined' && typeof Buffer === 'undefined') {
  // Assign Buffer to the global window object
  window.Buffer = Buffer;
}
