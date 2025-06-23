'use client';

import { useState } from 'react';

export default function UIDCard({ uuid }: { uuid: string }) {
  const referralUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.com'}/sign-up?reference=${uuid}`;

  const [copiedField, setCopiedField] = useState<'referral' | 'uuid' | null>(null);

  const copyToClipboard = (text: string, field: 'referral' | 'uuid') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);

    setTimeout(() => {
      setCopiedField(null);
    }, 5000);
  };

  const getButtonStyle = (field: 'referral' | 'uuid') => {
    return copiedField === field
      ? {
          backgroundColor: '#00b300',
          color: '#000',
        }
      : {
          backgroundColor: '#2563eb',
          color: '#fff',
        };
  };

  return (
    <div
      className="p-4 rounded-2xl shadow space-y-2"
      style={{ backgroundColor: '#1F1F1E' }}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="text-sm text-gray-300">Referral URL</label>
          <div
            className="flex items-center mt-1"
            style={{ backgroundColor: '#363636', borderRadius: '0.375rem' }}
          >
            <input
              type="text"
              value={referralUrl}
              readOnly
              className="flex-1 text-sm px-3 py-2 bg-transparent text-white border-none rounded-l-md focus:outline-none"
            />
            <button
              onClick={() => copyToClipboard(referralUrl, 'referral')}
              style={getButtonStyle('referral')}
              className="px-3 py-2 rounded-r-md text-sm flex items-center transition-colors duration-300"
            >
              {copiedField === 'referral' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm text-gray-300">UID</label>
          <div
            className="flex items-center mt-1"
            style={{ backgroundColor: '#363636', borderRadius: '0.375rem' }}
          >
            <input
              type="text"
              value={uuid}
              readOnly
              className="flex-1 text-sm px-3 py-2 bg-transparent text-white border-none rounded-l-md focus:outline-none"
            />
            <button
              onClick={() => copyToClipboard(uuid, 'uuid')}
              style={getButtonStyle('uuid')}
              className="px-3 py-2 rounded-r-md text-sm flex items-center transition-colors duration-300"
            >
              {copiedField === 'uuid' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
