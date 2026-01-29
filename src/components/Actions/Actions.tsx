import { FaEllipsisV } from "react-icons/fa";
import { Menu } from "../Menu/Menu";
import "./Actions.styles.css";
import { ActionsProps } from "./Actions.types";

export const Actions = ({
  onInfo,
  onEdit,
  onDelete,
  infoLabel = "Info",
  editLabel = "Edit",
  deleteLabel = "Delete",
}: ActionsProps) => {
  const items = [
    ...(onInfo ? [{ label: infoLabel, onClick: onInfo }] : []),
    ...(onEdit ? [{ label: editLabel, onClick: onEdit }] : []),
    ...(onDelete ? [{ label: deleteLabel, onClick: onDelete }] : []),
  ];

  if (items.length === 0) return null;

  return (
    <div className="actions-container">
      <Menu icon={FaEllipsisV} items={items} />
    </div>
  );
};
