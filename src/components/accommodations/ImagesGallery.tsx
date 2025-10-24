// ImagesGallery.tsx
import React from "react";
import type { Image } from "../../types/accommodation.types";

interface Props {
  images: Image[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const ImagesGallery: React.FC<Props> = ({ images, onAdd, onRemove }) => {
  return (
    <section className="mb-8 p-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold">Images</h2>
        <button
          onClick={onAdd}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          Add Image
        </button>
      </div>
      {images.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No images assigned.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-48 object-cover rounded cursor-pointer hover:opacity-80"
              />
              <button
                onClick={() => onRemove(image.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </button>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {image.alt}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ImagesGallery;
