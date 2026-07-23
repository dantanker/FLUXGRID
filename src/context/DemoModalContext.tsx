import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type DemoModalVariant = 'demo' | 'website';

type DemoModalContextValue = {
  isDemoModalOpen: boolean;
  modalVariant: DemoModalVariant;
  openDemoModal: () => void;
  openWebsiteMockupModal: () => void;
  closeDemoModal: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<DemoModalVariant>('demo');

  const openDemoModal = useCallback(() => {
    setModalVariant('demo');
    setIsDemoModalOpen(true);
  }, []);

  const openWebsiteMockupModal = useCallback(() => {
    setModalVariant('website');
    setIsDemoModalOpen(true);
  }, []);

  const closeDemoModal = useCallback(() => setIsDemoModalOpen(false), []);

  const value = useMemo(
    () => ({
      isDemoModalOpen,
      modalVariant,
      openDemoModal,
      openWebsiteMockupModal,
      closeDemoModal,
    }),
    [isDemoModalOpen, modalVariant, openDemoModal, openWebsiteMockupModal, closeDemoModal],
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
