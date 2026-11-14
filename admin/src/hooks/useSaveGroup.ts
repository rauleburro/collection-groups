import { useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import { Group } from './useGroups';

interface UseSaveGroupResult {
  loading: boolean;
  error: Error | null;
  saveGroup: (values: Partial<Group>, editingGroup?: Group | null) => Promise<void>;
}

export function useSaveGroup(): UseSaveGroupResult {
  const { post, put } = useFetchClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const saveGroup = async (values: Partial<Group>, editingGroup?: Group | null) => {
    setLoading(true);
    setError(null);
    try {
      if (editingGroup) {
        await put(`/collection-groups/groups/${editingGroup.id}`, values);
      } else {
        await post('/collection-groups/groups', values);
      }
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, saveGroup };
}
