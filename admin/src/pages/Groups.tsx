import React, { useEffect, useState } from 'react';
import { Layouts } from '@strapi/admin/strapi-admin';
import { Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Typography } from '@strapi/design-system';
import { Plus, Pencil, Trash, FileError } from '@strapi/icons';

import { useNotification } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import { useGroups } from '../hooks/useGroups';
import { useSaveGroup } from '../hooks/useSaveGroup';
import { useDeleteGroup } from '../hooks/useDeleteGroup';

import GroupForm from '../components/GroupForm';
import ConfirmDialog from '../components/ConfirmDialog';

interface Group {
  id: number;
  name: string;
  description?: string;
}

const Groups: React.FC = () => {
  const { data: groups, loading, error, refetch } = useGroups();
  const [showForm, setShowForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState<Group | null>(null);
  const { toggleNotification } = useNotification();
  const { formatMessage } = useIntl();

  const { saveGroup, loading: saving } = useSaveGroup();
  const { deleteGroup, loading: deleting } = useDeleteGroup();

  const handleCreate = () => {
    setEditingGroup(null);
    setShowForm(true);
  };

  const handleEdit = (group: Group) => {
    setEditingGroup(group);
    setShowForm(true);
  };

  const handleDelete = (group: Group) => {
    setDeletingGroup(group);
    setShowDelete(true);
  };

  const handleFormSubmit = async (values: Partial<Group>) => {
    try {
      await saveGroup(values, editingGroup);
      toggleNotification({
        type: 'success',
        message: formatMessage({
          id: editingGroup
            ? 'collection-groups.groups.update.success'
            : 'collection-groups.groups.create.success',
          defaultMessage: editingGroup ? 'Group updated' : 'Group created',
        }),
      });
      setShowForm(false);
      refetch();
    } catch (err) {
      toggleNotification({
        type: 'danger',
        message: formatMessage({
          id: 'collection-groups.groups.save.error',
          defaultMessage: 'Failed to save group',
        }),
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingGroup) return;
    try {
      await deleteGroup(deletingGroup);
      toggleNotification({
        type: 'success',
        message: formatMessage({
          id: 'collection-groups.groups.delete.success',
          defaultMessage: 'Group deleted',
        }),
      });
      setShowDelete(false);
      refetch();
    } catch (err) {
      toggleNotification({
        type: 'danger',
        message: formatMessage({
          id: 'collection-groups.groups.delete.error',
          defaultMessage: 'Failed to delete group',
        }),
      });
    }
  };

  return (
    <>
      <Layouts.BaseHeader title="Collection Groups" />
      <Layouts.Content>
        <Flex justifyContent="flex-end" mb={4}>
          <Button variant="default" startIcon={<Plus />} onClick={handleCreate}>
            Add Group
          </Button>
        </Flex>

        <Table colCount={3} rowCount={groups ? groups.length : 0}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="pi">Name</Typography>
              </Th>
              <Th>
                <Typography variant="pi">Description</Typography>
              </Th>
              <Th>
                <Typography variant="pi">Actions</Typography>
              </Th>
            </Tr>
          </Thead>

          {loading && <Typography>Loading...</Typography>}
          <Tbody>
            {error && (
              <Tr>
                <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: 120 }}
                >
                  <FileError color="danger" width={32} height={32} />
                  <Typography color="danger" style={{ marginTop: 8 }}>
                    Failed to load groups
                  </Typography>
                </Flex>
              </Tr>
            )}
            {groups?.map((group) => (
              <Tr key={group.id}>
                <Td>{group.name}</Td>
                <Td>{group.description}</Td>
                <Td>
                  <Flex gap={2}>
                    <Button
                      variant="tertiary"
                      startIcon={<Pencil />}
                      onClick={() => handleEdit(group)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger-light"
                      startIcon={<Trash />}
                      onClick={() => handleDelete(group)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {showForm && (
          <GroupForm
            initialValues={editingGroup ?? undefined}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
          />
        )}
        {showDelete && (
          <ConfirmDialog
            title="Delete Group"
            description={`Are you sure you want to delete group "${deletingGroup?.name}"?`}
            onCancel={() => setShowDelete(false)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </Layouts.Content>
    </>
  );
};

export default Groups;
