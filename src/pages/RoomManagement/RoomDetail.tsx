// RoomDetail.tsx - Detail view page
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById } from "../../api/roomAPI";
import type { RoomDetail } from "../../types/room.types";

const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id]);

  const fetchDetail = async (roomId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRoomById(roomId);
      setDetail(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load room details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-900 dark:text-white">
        Loading...
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 dark:text-red-400">
          {error || "Room not found."}
        </p>
        <button
          onClick={() => navigate("/rooms")}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{detail.name}</h1>
          <div className="flex items-center space-x-4 mb-2">
            <span className="flex items-center">
              {"★".repeat(Math.floor(detail.rating))}{" "}
              <span className="ml-1 text-yellow-500">{detail.rating}</span>
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                detail.available
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {detail.available ? "Available" : "Unavailable"}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                detail.breakfast
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              Breakfast: {detail.breakfast ? "Yes" : "No"}
            </span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-x-4">
            <span>Category: {detail.categoryName}</span>
            <span>Bed Type: {detail.bedTypeName || "N/A"}</span>
            <span>Cancel Policy: {detail.cancelPolicyName}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            <span>
              Created: {new Date(detail.createdAt).toLocaleDateString()}
            </span>
            {detail.modifyAt && (
              <span>
                {" "}
                • Modified: {new Date(detail.modifyAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => navigate("/rooms")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back to List
        </button>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Room Information
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong>ID:</strong> {detail.id.substring(0, 8)}...
            </p>
            <p>
              <strong>Number of Beds:</strong> {detail.numberOfBeds}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {(detail.price ?? 0).toLocaleString("vi-VN")} VNĐ
            </p>
            <p>
              <strong>Bed Type ID:</strong> {detail.bedTypeId}
            </p>
            <p>
              <strong>Cancel Policy ID:</strong> {detail.cancelPolicyId}
            </p>
            <p>
              <strong>Category ID:</strong> {detail.categoryId}
            </p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Status
          </h2>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Available:</strong> {detail.available ? "Yes" : "No"}
            </p>
            <p>
              <strong>Breakfast Included:</strong>{" "}
              {detail.breakfast ? "Yes" : "No"}
            </p>
            <p>
              <strong>Rating:</strong> {detail.rating} ★
            </p>
            <p>
              <strong>Update By:</strong> {detail.updateBy || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
