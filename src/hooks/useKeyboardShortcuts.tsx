import { PokemonType } from "@/@types";
import { Table } from "@tanstack/react-table";
import { useEffect } from "react";

type useKeyboardShortcutsProps = {
  table: Table<PokemonType>;
  isArrowHotkeysEnabled: boolean;
  selectedRowIndexRef: React.MutableRefObject<number>;
  inputRef: React.RefObject<HTMLInputElement>;
  setIsArrowHotkeysEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDetailsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useKeyboardShortcuts({
  table,
  isArrowHotkeysEnabled,
  selectedRowIndexRef,
  setIsArrowHotkeysEnabled,
  inputRef,
  setIsDetailsDialogOpen,
}: useKeyboardShortcutsProps) {
  useEffect(() => {
    const handleArrowKeys = (event: KeyboardEvent) => {
      const { rows } = table.getRowModel();

      if (event.code === "ArrowUp") {
        console.log("arrow up");

        if (selectedRowIndexRef.current >= 1) {
          table.toggleAllPageRowsSelected(false);
          const previousRowIndex = selectedRowIndexRef.current - 1;
          console.log("previousRowIndex", previousRowIndex);
          selectedRowIndexRef.current = previousRowIndex;
          rows[previousRowIndex].toggleSelected(true);
        }
        return;
      }

      if (event.code === "ArrowDown") {
        console.log("arrow down");
        if (selectedRowIndexRef.current !== null) {
          const nextRowIndex = selectedRowIndexRef.current + 1;
          if (nextRowIndex < rows.length) {
            table.toggleAllPageRowsSelected(false);
            selectedRowIndexRef.current = nextRowIndex;
            rows[nextRowIndex].toggleSelected(true);
          }
        }
        return;
      }

      if (event.code === "Escape") {
        inputRef.current?.blur();
        table.toggleAllPageRowsSelected(false);
        setIsArrowHotkeysEnabled(false);
      }

      if (event.code === "Enter") {
        console.log("enter pressed");

        setIsDetailsDialogOpen((prev) => !prev);
        inputRef.current?.blur();
        // setIsArrowHotkeysEnabled(false);
      }
    };

    if (isArrowHotkeysEnabled) {
      document.addEventListener("keydown", handleArrowKeys);
    }

    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, [isArrowHotkeysEnabled]);
}
