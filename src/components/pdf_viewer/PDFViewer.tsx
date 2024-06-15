import React, { useEffect, useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { SlPlus, SlMinus } from 'react-icons/sl';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import CustomZoomPlugin from './plugins/CustomZoomPlugin';
import './PDFViewer.scss';

export default function PDFViewer(props: { fileBytes: ArrayBuffer }) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [currZoom, setCurrZoom] = useState<number>(1);
  const customZoomPluginInstance = CustomZoomPlugin();
  const { zoomTo } = customZoomPluginInstance;

  useEffect(() => {
    if (props.fileBytes) {
      const blob = new Blob([props.fileBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setFileUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }

    zoomTo(SpecialZoomLevel.ActualSize);
  }, [props.fileBytes]);

  function updateCurrZoom(updateBy: number) {
    const maxZoom = 5;
    const minZoom = 0.1;
    const newZoom = Math.max(Math.min(currZoom + updateBy, maxZoom), minZoom);
    zoomTo(newZoom);
    setCurrZoom(newZoom);
  }

  return (
    <main className="pdf-container">
      <aside className="pdf-aside">Toolbars and others go here</aside>
      <article className="pdf-article">
        <div className="zoom-toolbar">
          <SlMinus onClick={() => updateCurrZoom(-0.1)} />
          <span className="zoom-percentage">{`${Math.round(currZoom * 100)}%`}</span>
          <SlPlus onClick={() => updateCurrZoom(0.1)} />
        </div>
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <div style={{ height: '750px' }}>
            {fileUrl ? (
              <Viewer fileUrl={fileUrl} plugins={[customZoomPluginInstance]} />
            ) : null}
          </div>
        </Worker>
      </article>
      <aside className="pdf-aside">Minimap goes here</aside>
    </main>
  );
}
