import { User } from "./user";

export interface PDFDocument {
    _id: string,
    title: string;
    description?: string;
    status: DocumentStatus;
    owner: User;
    can_share: boolean;
    share_token: string;
    file_path: string;
    is_owner: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface CreatePDFDocument {
    title: string;
    description?: string;
    file: File | null;
}

export interface UpdatePDFDocument {
    title: string;
    description?: string;
    status: DocumentStatus;
    can_share: boolean;
}

enum DocumentStatus {
  Active = "ACTIVE",
  Archived = "ARCHIVED",
}
