import { useState } from 'react';

export const useTransactionState = () => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return {
    isError,
    isSuccess,
    setError: () => setIsError(true),
    setSuccess: () => setIsSuccess(true),
    clearError: () => setIsError(false),
    clearSuccess: () => setIsSuccess(false),
  };
};
