import React, { useState } from "react";
import { SlDocs, SlEnvolope } from "react-icons/sl";
import { PDFDocument } from "@customTypes/pdf_document";
import { generateUrl } from "@utils";
import { CreateInvitation } from "@customTypes/invitation";
import api from '@api/index';
import './ShareDocument.scss';

interface ShareDocumentProps {
    document: PDFDocument
}

export default function ShareDocument(props: ShareDocumentProps) {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function handleShareViaEmail() {
        setLoading(true);
        const invitation: CreateInvitation = {
            document: props.document._id,
            invitee: email,
        };
        try {
            await api.invitation.createInvitation(invitation);
        } catch (err) {
            setError('Failed to invite');
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="share-component">
            <div className="share-link">
                <input
                    className="share-input"
                    type="text"
                    value={generateUrl('localhost:3000/share', {
                        token: props.document.share_token
                    })}
                    readOnly
                />
                <button className="button-secondary">
                    <SlDocs className='icon' />
                    Copy
                </button>
            </div>
            <div className="share-email">
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                />
                <button className="button-secondary" onClick={handleShareViaEmail}>
                    <SlEnvolope className="icon"/>
                    {loading ? 'Sharing...' : 'Share via email'}
                </button>
            </div>
        </div>
    )
}
