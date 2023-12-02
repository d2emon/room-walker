import { Store } from 'store/reducers';

export const getErrorId = (store: Store): number | undefined => {
  if (store.errors.errorId !== undefined) {
    return store.errors.errorId;
  }
  
  if (store.errors.errorMessage) {
    return 0;
  }
  
  return undefined;
 };

 export const getErrorMessage = (store: Store): string | undefined => (store.errors.errorMessage || undefined);
  