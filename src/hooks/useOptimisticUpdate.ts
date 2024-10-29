import { useState } from 'react';

export function useOptimisticUpdate<T>() {
  const [optimisticData, setOptimisticData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const performUpdate = async (
    updateFn: () => Promise<T>,
    rollbackFn: () => void
  ) => {
    try {
      const result = await updateFn();
      setOptimisticData(result);
      return result;
    } catch (err) {
      rollbackFn();
      setError(err as Error);
      throw err;
    }
  };

  return {
    optimisticData,
    error,
    performUpdate
  };
}