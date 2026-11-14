import { useCallback, useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';

export interface Group {
  id: number;
  name: string;
  description?: string;
}

interface UseGroupsResult {
  data: Group[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGroups(): UseGroupsResult {
  const { get } = useFetchClient();
  const [data, setData] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await get('/collection-groups/groups');
      setData(response.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return { data, loading, error, refetch: fetchGroups };
}
