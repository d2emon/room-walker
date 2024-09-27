import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getErrorCode,
  getErrorMessage,
  getHasError,
} from '../store/selectors';
import ErrorMessage from './ErrorMessage';
import { useDispatch } from 'react-redux';
import { resetErrors } from '../store/slice';

interface WithErrorProps {
  children?: ReactElement;
}

const WithError = (props: WithErrorProps) => {
  const {
    children,
  } = props;

  const dispatch = useDispatch();

  const errorId = useSelector(getErrorCode);
  const errorMessage = useSelector(getErrorMessage);
  const hasError = useSelector(getHasError);

  useEffect(
    () => {
      dispatch(resetErrors());
    },
    [dispatch],
  );

  if (hasError) {
    return (
      <ErrorMessage
        errorId={errorId}
        message={errorMessage}
      />
    )
  }

  return children || null;
};

export default WithError;
