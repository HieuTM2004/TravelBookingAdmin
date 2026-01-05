import React from "react";
import type { ImageDto } from "../../types/image.types";

interface ImageGalleryProps {
  images: ImageDto[];
  loading: boolean;
  onEdit: (image: ImageDto) => void;
  onDelete: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="relative group">
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Created: {new Date(image.createdAt).toLocaleDateString()}
                </p>
                {image.modifyAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Modified: {new Date(image.modifyAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              <button
                onClick={() => onDelete(image.id)}
                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded transition-colors shrink-0 ml-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
      {images.length === 0 && !loading && (
        <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-lg mb-2">No images yet</p>
          <p className="text-sm">Add your first image to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
