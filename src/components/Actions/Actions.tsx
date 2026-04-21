import { Info, Pencil, Trash } from "lucide-react";
import { IconButton } from "../IconButton/IconButton";
import "./Actions.styles.css";
import { ActionsProps } from "./Actions.types";

export const Actions = ({ onInfo, onEdit, onDelete }: ActionsProps) => {
  return (
    <div className="actions">
      {onInfo && (
        <IconButton
          icon={Info}
          size="small"
          variant="text"
          color="info"
          onClick={onInfo}
        />
      )}

      {onEdit && (
        <IconButton
          icon={Pencil}
          size="small"
          variant="text"
          color="success"
          onClick={onEdit}
        />
      )}

      {onDelete && (
        <IconButton
          icon={Trash}
          size="small"
          variant="text"
          color="error"
          onClick={onDelete}
        />
      )}
    </div>
  );
};
