'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

interface DevicePreviewContextType {
  device: DeviceMode;
  setDevice: (d: DeviceMode) => void;
}

const DevicePreviewContext = createContext<DevicePreviewContextType>({
  device: 'desktop',
  setDevice: () => {},
});

export function DevicePreviewProvider({ children }: { children: ReactNode }) {
  const [device, setDevice] = useState<DeviceMode>('desktop');

  return (
    <DevicePreviewContext.Provider value={{ device, setDevice }}>
      {children}
    </DevicePreviewContext.Provider>
  );
}

export const useDevicePreview = () => useContext(DevicePreviewContext);
