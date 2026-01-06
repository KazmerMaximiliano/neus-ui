import { FaPen, FaTrash } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { IconButton } from "../IconButton/IconButton";
import "./Actions.styles.css";
import { ActionsProps } from "./Actions.types";

export const Actions = ({ onInfo, onEdit, onDelete }: ActionsProps) => {
  return (
    <div className="actions-container">
      {onInfo && (
        <IconButton
          icon={FaCircleInfo}
          size="small"
          variant="text"
          color="info"
          onClick={onInfo}
        />
      )}

      {onEdit && (
        <IconButton
          icon={FaPen}
          size="small"
          variant="text"
          color="success"
          onClick={onEdit}
        />
      )}

      {onDelete && (
        <IconButton
          icon={FaTrash}
          size="small"
          variant="text"
          color="error"
          onClick={onDelete}
        />
      )}
    </div>
  );
};
