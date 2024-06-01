import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './PDFViewer.scss';

export default function PDFViewer(props: { fileBytes: ArrayBuffer }) {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const zoomPluginInstance = zoomPlugin();

    useEffect(() => {
        if (props.fileBytes) {
            const blob = new Blob([props.fileBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setFileUrl(url);

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [props.fileBytes]);

    return (
        <div className="pdf-container">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <div style={{ height: '750px' }}>
                    {fileUrl ? <Viewer fileUrl={fileUrl} plugins={[zoomPluginInstance]} /> : null}
                </div>
            </Worker>
        </div>
    )
};
