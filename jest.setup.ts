import { TextDecoder, TextEncoder } from 'util';
import '@testing-library/jest-dom';

Object.assign(global, { TextDecoder, TextEncoder });

if (typeof File !== 'undefined' && typeof File.prototype.text !== 'function') {
  File.prototype.text = function text() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ''));
      reader.onerror = () => reject(reader.error);
      reader.readAsText(this);
    });
  };
}
