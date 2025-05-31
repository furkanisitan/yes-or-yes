import type { Ref, RefObject } from 'react';

function useRefCurrent<T>(ref: Ref<T> | undefined): T | undefined {
  if (ref && typeof ref !== 'function') {
    return (ref as RefObject<T>)?.current;
  }
  return undefined;
}

export default useRefCurrent;
