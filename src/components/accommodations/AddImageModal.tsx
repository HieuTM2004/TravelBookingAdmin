// AddImageModal.tsx - Updated with combobox (select) for images
import React, { useState, useEffect } from "react";
import { getImages } from "../../api/imageAPI"; // Import for images
import type { ImageDto } from "../../types/image.types";
import { assignImage } from "../../api/accommodationAPI";

interface AddImageModalProps {
  show: boolean;
  accomId: string; // Pass accomId for POST
  onClose: () => void;
  // onAssign: (imageId: string) => void;
  onRefresh: () => void; // Callback to refresh parent
}

const AddImageModal: React.FC<AddImageModalProps> = ({
  show,
  accomId,
  onClose,
  onRefresh,
}) => {
  const [availableImages, setAvailableImages] = useState<ImageDto[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchAvailableImages();
    } else {
      setAvailableImages([]);
      setSelectedId("");
    }
  }, [show]);

  const fetchAvailableImages = async () => {
    setLoading(true);
    try {
      const data = await getImages();
      setAvailableImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (selectedId) {
      try {
        await assignImage(accomId, selectedId); // POST to /Accommodation/{accomId}/images/{id}
        onRefresh(); // Refresh parent
        onClose(); // Close modal
      } catch (error) {
        console.error("Error assigning image:", error);
        // Optional: Alert
      }
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add Image to Accommodation
        </h2>
        <div className="relative">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            disabled={loading}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Select Image</option>
            {availableImages.map((image) => (
              <option key={image.id} value={image.id}>
                {image.alt || `Image ${image.id.substring(0, 8)}...`}
              </option>
            ))}
          </select>
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedId}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md disabled:opacity-50 transition-colors"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddImageModal;
