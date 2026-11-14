import { useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Group } from './useGroups';

interface UseDeleteGroupResult {
  loading: boolean;
  error: Error | null;
  deleteGroup: (group: Group) => Promise<void>;
}

export function useDeleteGroup(): UseDeleteGroupResult {
  const { del } = useFetchClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteGroup = async (group: Group) => {
    setLoading(true);
    setError(null);
    try {
      await del(`/collection-groups/groups/${group.id}`);
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteGroup };
}
