import { IColumnModel } from "@/models/column.model";
import { create } from "zustand";

interface ColumnStore {
  columns: IColumnModel[];
  updateColumns: (userData: IColumnModel[]) => void;
  resetColumns: () => void;
}

const initialState: IColumnModel[] = [];

const useColumnStore = create<ColumnStore>((set) => ({
  columns: initialState,
  updateColumns: (newColumns: IColumnModel[]) => set(() => ({ columns: newColumns })),
  resetColumns: () => set((state) => ({ ...state, columns: { ...initialState } }))
}));

export default useColumnStore;
