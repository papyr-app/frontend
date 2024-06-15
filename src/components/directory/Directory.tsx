import React, { useState } from 'react';
import { SlFolder, SlFolderAlt } from 'react-icons/sl';
import { TreeNode } from '@customTypes/tree_node';
import { PDFDocument } from '@customTypes/pdf_document';
import File from '@components/file/File';
import './Directory.scss';

interface DirectoryProps {
  treeNode: TreeNode;
  handleShowEditModal: (doc: PDFDocument) => void;
  handleShowShareModal: (doc: PDFDocument) => void;
}

export default function Directory({
  treeNode,
  handleShowEditModal,
  handleShowShareModal,
}: DirectoryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggleOpen(e: React.MouseEvent) {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  return (
    <li className="directory-container" onClick={(e) => toggleOpen(e)}>
      <div className="directory-name">
        {isOpen ? (
          <SlFolderAlt className="directory-icon" />
        ) : (
          <SlFolder className="directory-icon" />
        )}{' '}
        {treeNode.name}
      </div>
      <ul className={`nested ${isOpen ? 'open' : 'closed'}`}>
        {treeNode.children.map((child) =>
          child.isFile && child.doc ? (
            <File
              key={child.doc._id}
              doc={child.doc}
              handleShowEditModal={handleShowEditModal}
              handleShowShareModal={handleShowShareModal}
            />
          ) : (
            <Directory
              key={child.name}
              treeNode={child}
              handleShowEditModal={handleShowEditModal}
              handleShowShareModal={handleShowShareModal}
            />
          )
        )}
      </ul>
    </li>
  );
}
