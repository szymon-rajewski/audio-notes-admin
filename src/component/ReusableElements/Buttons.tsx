import React from 'react';
import { Button } from '../ui/Button';

type Props = {
  onEditClick?: () => void;
  onCancelClick?: () => void;
  onSaveClick?: () => void;
  onCopyClick?: () => void;
  save?: string;
  saveName?: string;
  copy?: string;
  copyName?: string;
  cancel?: string;
  cancelName?: string;
  edit?: string;
  editName?: string;
  iconSave?: React.ReactNode;
  iconCopy?: React.ReactNode;
  iconCancel?: React.ReactNode;
  iconEdit?: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
};

export const Buttons: React.FC<Props> = ({
  save,
  saveName,
  copy,
  copyName,
  cancel,
  cancelName,
  edit,
  editName,
  iconSave,
  iconCopy,
  iconEdit,
  iconCancel,
  type,
  onEditClick,
  onCancelClick,
  onSaveClick,
  onCopyClick,
}) => {
  return (
    <div
      className={
        saveName || editName || copyName || cancelName ? '' : `flex flex-nowrap`
      }
    >
      {save && (
        <Button
          onClick={onSaveClick}
          type={type}
          className={saveName ? 'mr-2' : 'mb-1 ml-2 p-0 pl-2'}
          variant="outline"
          icon={iconSave}
          iconSize="text-lg"
          size="sm"
        >
          {saveName}
        </Button>
      )}
      {edit && (
        <Button
          onClick={onEditClick}
          type={type}
          className={editName ? 'mr-2' : 'mb-1 ml-2 p-0 pl-2'}
          variant="outline"
          icon={iconEdit}
          iconSize="text-lg"
          size="sm"
        >
          {editName}
        </Button>
      )}
      {copy && (
        <Button
          onClick={onCopyClick}
          type={type}
          className={copyName ? 'mr-2' : 'mb-1 ml-2 p-0 pl-2'}
          variant="outline"
          icon={iconCopy}
          iconSize="text-lg"
          size="sm"
        >
          {copyName}
        </Button>
      )}
      {cancel && (
        <Button
          onClick={onCancelClick}
          type={type}
          className={cancelName ? 'mr-2' : 'mb-1 ml-2 p-0 pl-2'}
          variant="outline"
          icon={iconCancel}
          iconSize="text-lg"
          size="sm"
        >
          {cancelName}
        </Button>
      )}
    </div>
  );
};
