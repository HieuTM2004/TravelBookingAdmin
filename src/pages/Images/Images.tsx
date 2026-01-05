import React, { useState, useEffect } from "react";
import {
  getImages,
  createImage,
  updateImage,
  deleteImage,
} from "../../api/imageAPI";
import type { ImageDto } from "../../types/image.types";
import ImageGallery from "../../components/image/ImageGallery";
import ImageModal from "../../components/image/ImageModal";

const Images: React.FC = () => {
  const [images, setImages] = useState<ImageDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Lấy danh sách ảnh khi component mount
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await getImages();
      setImages(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách ảnh:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cập nhật: Hàm handleSubmit giờ nhận 2 tham số
   * @param file - Đối tượng File binary
   * @param alt - Chuỗi mô tả ảnh (SEO)
   */
  const handleSubmit = async (file: File, alt: string) => {
    setLoading(true);
    try {
      if (editingId) {
        await updateImage(editingId, file, alt);
      } else {
        await createImage(file, alt);
      }

      await fetchImages(); // Refresh danh sách
      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi lưu ảnh:", error);
      alert(
        "Không thể lưu ảnh. Vui lòng kiểm tra lại định dạng hoặc thông tin nhập vào."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: ImageDto) => {
    setEditingId(image.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này không?")) {
      try {
        await deleteImage(id);
        fetchImages();
      } catch (error) {
        console.error("Lỗi khi xóa ảnh:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Images</h1>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all hover:shadow-lg flex items-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add New Image</span>
        </button>
      </div>

      {/* Gallery Section */}
      <div className="relative">
        {loading && !showModal && (
          <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 z-10 flex items-center justify-center backdrop-blur-[1px] rounded-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        )}

        <ImageGallery
          images={images}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal Section */}
      <ImageModal
        show={showModal}
        editingId={editingId}
        onClose={handleCloseModal}
        onSubmit={handleSubmit} // handleSubmit ở đây sẽ được gọi với (file, alt)
      />
    </div>
  );
};

export default Images;
