import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

const PDFModal = ({ isOpen, onClose, fileUrl, isImage }) => {
  const [absoluteUrl, setAbsoluteUrl] = useState("");
  // console.log(`loging in model url: ${fileUrl} isOpen: ${isOpen} osImage: ${isImage}`);


  useEffect(() => {
    if (fileUrl) {
      // If it's already an absolute URL (e.g. starts with http or https), use it as-is
      if (/^https?:\/\//i.test(fileUrl)) {
        setAbsoluteUrl(fileUrl);
      } else {
        setAbsoluteUrl(`${window.location.origin}${fileUrl}`);
      }
      // console.log(`Set absoluteUrl to: ${fileUrl}`);
    }
  }, [fileUrl]);


  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      {/* Modal Content */}
      <div className="fixed inset-0 flex items-center justify-center p-6">
        <Dialog.Panel className="relative w-full max-w-5xl rounded-xl bg-white shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-red-600 transition"
          >
            ✕
          </button>

          {/* File Preview */}
          <div className="w-full h-[80vh] flex justify-center items-center bg-gray-100">
            {isImage ? (
              <img
                src={absoluteUrl}
                alt="Preview"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <object
                data={absoluteUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <p className="p-4 text-center text-gray-700">
                  PDF cannot be displayed.
                  <a
                    href={absoluteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download here
                  </a>
                </p>
              </object>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PDFModal;
