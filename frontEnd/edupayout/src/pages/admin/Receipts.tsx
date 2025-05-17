import React from 'react';
import { LucideFileText } from 'lucide-react';

const AdminReceipts: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Receipts</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all receipts generated for mentor payouts.
          </p>
        </div>
      </div>
      
      {/* Placeholder content */}
      <div className="mt-8 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <LucideFileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No receipts</h3>
          <p className="mt-1 text-sm text-gray-500">
            No receipts have been generated yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminReceipts;