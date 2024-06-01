import React  from 'react';
import { PDFDocument } from '@customTypes/pdf_document';
import { SlShare, SlPencil } from 'react-icons/sl';
import './File.scss';

interface FileProps {
    doc: PDFDocument;
    handleShowEditModal: (doc: PDFDocument) => void;
    handleShowShareModal: (doc: PDFDocument) => void;
}

export default function File({ doc, handleShowEditModal, handleShowShareModal }: FileProps) {
    return (
        <li className="document-item">
            <a className="document-link" href={`document/${doc._id}`}>{doc.title}</a>
            <p className="document-owner">Owner: {doc.owner.first_name} {doc.owner.last_name} ({doc.owner.username})</p>
            <p className="document-updated">Last updated: {new Date(doc.updated_at).toLocaleDateString()}</p>
            <button className="button-secondary edit-button" >
                <SlPencil className="icon" /> Edit
            </button>
            <button className="button-secondary share-button" >
                <SlShare className="icon" /> Share
            </button>
        </li>
    );
}

