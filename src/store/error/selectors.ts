import { Store } from '..';

// Selectors
export const getErrorCode = (store: Store): number | undefined => {
  if (store.mudErrors.code !== undefined) {
    return store.mudErrors.code;
  }
    
  if (store.mudErrors.message) {
    return 0;
  }
    
  return undefined;
};
  
export const getErrorMessage = (store: Store): string | undefined => (store.mudErrors.message || undefined);
    