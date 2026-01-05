// AccommodationImagesGallery.tsx - Modernized UI
import React from "react";
import type { Image } from "../../types/accommodation.types";
import { removeImage } from "../../api/accommodationAPI";
import DynamicIcon from "../common/DynamicIcon"; // Dùng lại DynamicIcon cho đồng bộ

interface Props {
  images: Image[];
  onAdd: () => void;
  accomId: string;
  onRefresh: () => void;
}

const AccommodationImagesGallery: React.FC<Props> = ({
  images,
  onAdd,
  accomId,
  onRefresh,
}) => {
  const handleRemove = async (imageId: string) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      try {
        await removeImage(accomId, imageId);
        onRefresh();
      } catch (error) {
        console.error("Error removing image:", error);
      }
    }
  };

  return (
    <section className="mb-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm relative">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Gallery Images
          </h2>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95"
        >
          + Add Image
        </button>
      </div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
          <DynamicIcon
            iconName="image_not_supported"
            size={48}
            className="text-gray-300 mb-2"
          />
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            No images assigned yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-xl"
            >
              {/* Image Container with Aspect Ratio */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm font-medium line-clamp-2 mb-1">
                  {image.alt || "Untitled Image"}
                </p>
              </div>

              {/* Delete Button - Premium Look */}
              <button
                onClick={() => handleRemove(image.id)}
                className="absolute top-3 right-3 bg-white/90 hover:bg-red-500 text-gray-800 hover:text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg backdrop-blur-sm transform translate-y-[-10px] group-hover:translate-y-0"
                title="Remove image"
              >
                <DynamicIcon iconName="delete_outline" size={20} />
              </button>

              {/* Tag/Badge for image info (Optional) */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/40 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  HD Image
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AccommodationImagesGallery;
