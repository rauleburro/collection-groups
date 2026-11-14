import React, { useState } from 'react';
import {
  Button,
  Textarea,
  Flex,
  Modal,
  Field,
} from '@strapi/design-system';

interface GroupFormProps {
  initialValues?: { name?: string; description?: string };
  onClose: () => void;
  onSubmit: (values: { name: string; description?: string }) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ initialValues, onClose, onSubmit }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setError(undefined);
    setSubmitting(true);
    await onSubmit({ name, description });
    setSubmitting(false);
  };

  return (
    <Modal.Root open onOpenChange={(open: boolean) => { if (!open) onClose(); }}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{initialValues ? 'Edit Group' : 'Create Group'}</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Field.Root name="name" required>
              <Field.Label>Name</Field.Label>
              <Field.Input
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                  if (error) setError(undefined);
                }}
                autoFocus
                disabled={submitting}
                error={error}
                placeholder="Enter group name"
                aria-describedby="name-helper-text"
              />
              <Field.Hint id="name-helper-text">This is the display name for the group.</Field.Hint>
              {error && <Field.Error>{error}</Field.Error>}
            </Field.Root>
            <Field.Root name="description">
              <Field.Label>Description</Field.Label>
              <Textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                disabled={submitting}
                placeholder="Enter group description (optional)"
                aria-describedby="description-helper-text"
              />
              <Field.Hint id="description-helper-text">A short description for this group.</Field.Hint>
            </Field.Root>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>
              <Button variant="tertiary" disabled={submitting}>Cancel</Button>
            </Modal.Close>
            <Button type="submit" loading={submitting}>Save</Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal.Root>
  );
};

export default GroupForm;
