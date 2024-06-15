import { useMemo } from 'react';
import {
  createStore,
  Plugin,
  PluginFunctions,
  SpecialZoomLevel,
} from '@react-pdf-viewer/core';

import StoreProps from '@customTypes/store_props';

interface CustomZoomPlugin extends Plugin {
  zoomTo(scale: number | SpecialZoomLevel): void;
}

export default function CustomZoomPlugin(): CustomZoomPlugin {
  const store = useMemo(() => createStore<StoreProps>({}), []);

  return {
    install: (pluginFunctions: PluginFunctions) => {
      store.update('zoom', pluginFunctions.zoom);
    },
    zoomTo: (scale: number | SpecialZoomLevel) => {
      const zoom = store.get('zoom');
      if (zoom) {
        zoom(scale);
      }
    },
  };
}
