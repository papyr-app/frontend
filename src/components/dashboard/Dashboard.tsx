import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument } from '@customTypes/pdf_document';
import { SlCloudUpload } from 'react-icons/sl';
import { TreeNode } from '@customTypes/tree_node';
import Directory from '@components/directory/Directory';
import ShareDocument from '@components/share_document/ShareDocument';
import EditDocument from '@components/edit_document/EditDocument';
import Modal from '@components/modal/Modal';
import api from '@api/index';
import './Dashboard.scss';

export default function Dashboard() {
  const [documents, setDocuments] = useState<PDFDocument[]>([]);
  const [ownerRoot, setOwnerRoot] = useState<TreeNode | null>(null);
  const [sharedRoot, setSharedRoot] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<PDFDocument | null>(
    null
  );
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const data = await api.user.getUserDocuments();
        setDocuments(data.data);
      } catch (err) {
        setError('Failed to fetch documents');
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, []);

  useEffect(() => {
    function buildTree(documents: PDFDocument[]) {
      const rootOwner: TreeNode = { name: 'My Files', children: [] };
      const rootShared: TreeNode = { name: 'Shared with Me', children: [] };

      documents.forEach((doc) => {
        const parts = doc.file_path.split('/').filter((part) => part);
        let current = doc.is_owner ? rootOwner : rootShared;

        parts.forEach((part, index) => {
          let node = current.children.find((child) => child.name === part);
          if (!node) {
            node = {
              name: part,
              children: [],
              isFile: index === parts.length - 1,
              doc,
            };
            current.children.push(node);
          }
          current = node;
        });
      });

      return [rootOwner, rootShared];
    }

    const [ownerTree, sharedTree] = buildTree(documents);
    setOwnerRoot(ownerTree);
    setSharedRoot(sharedTree);
  }, [documents]);

  function uploadDocument() {
    navigate(`/document/new`);
  }

  function handleShowShareModal(document: PDFDocument) {
    setSelectedDocument(document);
    setShowShareModal(true);
  }

  function handleCloseShareModal() {
    setSelectedDocument(null);
    setShowShareModal(false);
  }

  function handleShowEditModal(document: PDFDocument) {
    setSelectedDocument(document);
    setShowEditModal(true);
  }

  function handleCloseEditModal() {
    setSelectedDocument(null);
    setShowEditModal(false);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">All Documents</h2>
        <button
          className="button-primary upload-button"
          onClick={uploadDocument}
        >
          <SlCloudUpload className="icon" /> Upload Document
        </button>
      </div>

      <div className="document-container">
        {ownerRoot && (
          <ul>
            <Directory
              key={ownerRoot.name}
              treeNode={ownerRoot}
              handleShowEditModal={handleShowEditModal}
              handleShowShareModal={handleShowShareModal}
            />
          </ul>
        )}

        {sharedRoot && (
          <ul>
            <Directory
              key={sharedRoot.name}
              treeNode={sharedRoot}
              handleShowEditModal={handleShowEditModal}
              handleShowShareModal={handleShowShareModal}
            />
          </ul>
        )}
      </div>

      <Modal show={showShareModal} onClose={handleCloseShareModal}>
        <h2 className="modal-title">Share</h2>
        {selectedDocument && <ShareDocument document={selectedDocument} />}
      </Modal>

      <Modal show={showEditModal} onClose={handleCloseEditModal}>
        <h2 className="modal-title">Edit</h2>
        {selectedDocument && <EditDocument />}
      </Modal>
    </div>
  );
}
