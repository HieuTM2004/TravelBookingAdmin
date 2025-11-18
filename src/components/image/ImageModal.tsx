import React, { useState } from "react";
import type { ImageCreateDto } from "../../types/image.types";

interface ImageModalProps {
  show: boolean;
  editingId: string | null;
  formData: ImageCreateDto;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: ImageCreateDto) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  show,
  editingId,
  formData,
  onClose,
  onSubmit,
  onFormDataChange,
}) => {
  const [previewUrl, setPreviewUrl] = useState(formData.url);

  if (!show) return null;

  const handleUrlChange = (value: string) => {
    onFormDataChange({ ...formData, url: value });
    setPreviewUrl(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {editingId ? "Edit Image" : "Add New Image"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.url}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 w-full h-32 object-cover rounded-md border"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ""; // Hide if invalid
                }}
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Alt Text
            </label>
            <input
              type="text"
              placeholder="Description for accessibility"
              value={formData.alt}
              onChange={(e) =>
                onFormDataChange({ ...formData, alt: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 shadow-sm transition-all"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageModal;
