import React, { useState } from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Modal } from "@neus-ui/src/components/Modal/Modal";
import { Button } from "@neus-ui/src/components/Button/Button";
import type { ButtonColor } from "@neus-ui/src/components/Button/Button.types";

const colors: ButtonColor[] = ["primary", "success", "error", "info"];

function ModalDemo({ color }: { color: ButtonColor }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        label={`Open (${color})`}
        variant="outlined"
        color={color}
        onClick={() => setOpen(true)}
      />
      <Modal
        isOpen={open}
        title="Confirm action"
        confirmText="Confirm"
        cancelText="Cancel"
        confirmButtonColor={color}
        onConfirm={() => { alert("Confirmed"); setOpen(false); }}
        onCancel={() => setOpen(false)}
      >
        This is a modal dialog with <strong>{color}</strong> confirm button.
      </Modal>
    </>
  );
}

export function ModalDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", padding: "1.5rem 0" }}>
        {colors.map((color) => (
          <ModalDemo key={color} color={color} />
        ))}
      </div>
    </ThemeProvider>
  );
}
