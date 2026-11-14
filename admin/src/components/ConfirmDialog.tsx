import React from 'react';
import { Button, Dialog, Typography } from '@strapi/design-system';
import { WarningCircle } from '@strapi/icons';

interface ConfirmDialogProps {
  title: string;
  description: string;
  onCancel: (open: boolean) => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog.Root open onOpenChange={(open: boolean) => { if (!open) onCancel(open); }}>
      <Dialog.Content>
        <Dialog.Header>{title}</Dialog.Header>
        <Dialog.Body icon={<WarningCircle fill="danger600" />}>{description}</Dialog.Body>
        <Dialog.Footer>
          <Dialog.Cancel>
            <Button fullWidth variant="tertiary">Cancel</Button>
          </Dialog.Cancel>
          <Dialog.Action>
            <Button fullWidth variant="danger-light" onClick={onConfirm}>
              Yes, delete
            </Button>
          </Dialog.Action>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
