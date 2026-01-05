import React, { useState, useEffect } from "react";

interface ImageModalProps {
  show: boolean;
  editingId: string | null;
  onClose: () => void;
  // Update onSubmit to accept two parameters: file and alt
  onSubmit: (file: File, alt: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  show,
  editingId,
  onClose,
  onSubmit,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [altText, setAltText] = useState<string>(""); // New state for alt text
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle image preview
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  // Reset form when closing modal
  const handleClose = () => {
    setSelectedFile(null);
    setAltText("");
    onClose();
  };

  if (!show) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmit(selectedFile, altText);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100000] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl transition-all border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
          {editingId ? "Update Image" : "Upload New Image"}
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          {/* 1. Choose File */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Choose image file
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 
                file:mr-4 file:py-2 file:px-4 
                file:rounded-full file:border-0 
                file:text-sm file:font-semibold 
                file:bg-blue-50 file:text-blue-700 
                hover:file:bg-blue-100 
                dark:file:bg-gray-700 dark:file:text-gray-300
                cursor-pointer"
              required={!editingId}
            />
          </div>

          {/* 2. Enter Alt Text */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Image description (Alt Text)
            </label>
            <input
              type="text"
              placeholder="e.g.: Room with pine hill view..."
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          {/* Image preview area */}
          <div className="rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center h-40">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <p className="text-gray-400 text-sm italic">
                No preview available
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedFile || !altText.trim()}
              className={`px-6 py-2 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95
                ${
                  selectedFile && altText.trim()
                    ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              {editingId ? "Save changes" : "Upload now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageModal;
