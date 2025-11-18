// Images.tsx - Main page with gallery layout (thumbnails, read-only dates)
import React, { useState, useEffect } from "react";
import {
  getImages,
  createImage,
  updateImage,
  deleteImage,
  getImageById,
} from "../../api/imageAPI";
import type {
  ImageCreateDto,
  ImageUpdateDto,
  ImageDto,
} from "../../types/image.types";
import ImageGallery from "../../components/image/ImageGallery";
import ImageModal from "../../components/image/ImageModal";

const Images: React.FC = () => {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ImageCreateDto>({
    url: "",
    alt: "",
  });

  // Fetch all images
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await getImages();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateImage(editingId, formData as ImageUpdateDto);
      } else {
        await createImage(formData);
      }
      fetchImages(); // Refresh list
      setShowModal(false);
      setEditingId(null);
      setFormData({ url: "", alt: "" });
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  // Handle edit (fetch full detail)
  const handleEdit = async (image: ImageDto) => {
    try {
      setEditingId(image.id);
      const fullDetail = await getImageById(image.id);
      setFormData({
        url: fullDetail.url,
        alt: fullDetail.alt,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteImage(id);
        fetchImages();
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Images</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition-all hover:shadow-lg"
        >
          Add New
        </button>
      </div>

      {/* Search/Filter */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <input
          type="text"
          placeholder="Search by alt text..."
          className="w-full max-w-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            // Add search logic if needed
          }}
        />
      </div>

      <ImageGallery
        images={images}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ImageModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ url: "", alt: "" });
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
      />
    </div>
  );
};

export default Images;
