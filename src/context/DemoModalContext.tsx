import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type DemoModalContextValue = {
  isDemoModalOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const openDemoModal = useCallback(() => setIsDemoModalOpen(true), []);
  const closeDemoModal = useCallback(() => setIsDemoModalOpen(false), []);

  const value = useMemo(
    () => ({ isDemoModalOpen, openDemoModal, closeDemoModal }),
    [isDemoModalOpen, openDemoModal, closeDemoModal],
  );

  return <DemoModalContext.Provider value={value}>{children}</DemoModalContext.Provider>;
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error('useDemoModal must be used within DemoModalProvider');
  }
  return context;
}
