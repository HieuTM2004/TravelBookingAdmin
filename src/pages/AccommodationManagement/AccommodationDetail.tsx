// AccommodationDetail.tsx - Main detail page component
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GeneralInfoSection from "../../components/accommodations/GeneralInfoSection";
import PolicySection from "../../components/accommodations/PolicySection";
import FacilitiesSection from "../../components/accommodations/FacilitiesSection";
import ImagesGallery from "../../components/accommodations/ImagesGallery";
import RoomCategoriesSection from "../../components/accommodations/RoomCategoriesSection";
import ReviewsSection from "../../components/accommodations/ReviewsSection";
import {
  getAccommodationById,
  updateGeneralInfo,
  deleteGeneralInfo,
  updatePolicy,
  deletePolicy,
  assignImage,
  removeImage,
  assignFacility,
  removeFacility,
} from "../../api/accommodationAPI";
import type {
  AccomDetailDto,
  GeneralInfoUpdateDto,
  PolicyUpdateDto,
  // Facility,
  // Image,
} from "../../types/accommodation.types";
import EditGeneralInfoModal from "../../components/accommodations/EditGeneralInfoModal";
import EditPolicyModal from "../../components/accommodations/EditPolicyModal";
import AddImageModal from "../../components/accommodations/AddImageModal";
import AddFacilityModal from "../../components/accommodations/AddFacilityModal";

const AccommodationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<AccomDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showGeneralModal, setShowGeneralModal] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [showAddFacilityModal, setShowAddFacilityModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id]);

  const fetchDetail = async (accomId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAccommodationById(accomId);
      console.log(data);
      setDetail(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load accommodation details.");
    } finally {
      setLoading(false);
    }
  };

  const refreshDetail = () => fetchDetail(id!); // Refresh after updates

  // Handlers for General Info
  const handleEditGeneral = () => setShowGeneralModal(true);
  const handleDeleteGeneral = async () => {
    if (window.confirm("Delete general info?")) {
      try {
        await deleteGeneralInfo(id!);
        refreshDetail();
      } catch (err) {
        console.log(err);
        console.error("Error deleting general info");
      }
    }
  };

  const handleSaveGeneral = async (data: GeneralInfoUpdateDto) => {
    try {
      await updateGeneralInfo(id!, data);
      refreshDetail();
      setShowGeneralModal(false);
    } catch (err) {
      console.log(err);
      console.error("Error updating general info");
    }
  };

  // Handlers for Policy
  const handleEditPolicy = () => setShowPolicyModal(true);
  const handleDeletePolicy = async () => {
    if (window.confirm("Delete policy?")) {
      try {
        await deletePolicy(id!);
        refreshDetail();
      } catch (err) {
        console.log(err);
        console.error("Error deleting policy");
      }
    }
  };

  const handleSavePolicy = async (data: PolicyUpdateDto) => {
    try {
      await updatePolicy(id!, data);
      refreshDetail();
      setShowPolicyModal(false);
    } catch (err) {
      console.log(err);
      console.error("Error updating policy");
    }
  };

  // Handlers for Images
  const handleAddImage = () => setShowAddImageModal(true);
  const handleRemoveImage = async (imageId: string) => {
    if (window.confirm("Remove this image?")) {
      try {
        await removeImage(id!, imageId);
        refreshDetail();
      } catch (err) {
        console.log(err);
        console.error("Error removing image");
      }
    }
  };

  const handleAssignImage = async (imageId: string) => {
    try {
      await assignImage(id!, imageId);
      refreshDetail();
      setShowAddImageModal(false);
    } catch (err) {
      console.log(err);
      console.error("Error assigning image");
    }
  };

  // Handlers for Facilities
  const handleAddFacility = () => setShowAddFacilityModal(true);
  const handleRemoveFacility = async (facilityId: string) => {
    if (window.confirm("Remove this facility?")) {
      try {
        await removeFacility(id!, facilityId);
        refreshDetail();
      } catch (err) {
        console.log(err);
        console.error("Error removing facility");
      }
    }
  };

  const handleAssignFacility = async (facilityId: string) => {
    try {
      await assignFacility(id!, facilityId);
      refreshDetail();
      setShowAddFacilityModal(false);
    } catch (err) {
      console.log(err);
      console.error("Error assigning facility");
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
          {error || "Accommodation not found."}
        </p>
        <button
          onClick={() => navigate("/accommodations")}
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
          <div className="flex items-center space-x-4 text-lg">
            <span className="flex items-center">
              {"★".repeat(detail.star)}
              <span className="ml-1 text-yellow-500">({detail.star})</span>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              Rating: {detail.rating}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {detail.location} • {detail.address}
            </span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {detail.email} • {detail.phone}
          </p>
        </div>
        <button
          onClick={() => navigate("/accommodations")}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back to List
        </button>
      </div>

      {/* Sections */}
      <GeneralInfoSection
        generalInfo={detail.generalInfo || null}
        onEdit={handleEditGeneral}
        onDelete={handleDeleteGeneral}
      />
      <PolicySection
        policy={detail.policy || null}
        onEdit={handleEditPolicy}
        onDelete={handleDeletePolicy}
      />
      <FacilitiesSection
        facilities={detail.facilities || []}
        onAdd={handleAddFacility}
        onRemove={handleRemoveFacility}
      />
      <ImagesGallery
        images={detail.images || []}
        onAdd={handleAddImage}
        onRemove={handleRemoveImage}
      />
      <RoomCategoriesSection roomCategories={detail.roomCategories || []} />
      <ReviewsSection reviews={detail.reviews || []} />

      {/* Modals */}
      <EditGeneralInfoModal
        show={showGeneralModal}
        initialData={detail.generalInfo || ({} as GeneralInfoUpdateDto)}
        onClose={() => setShowGeneralModal(false)}
        onSave={handleSaveGeneral}
      />
      <EditPolicyModal
        show={showPolicyModal}
        initialData={detail.policy || ({} as PolicyUpdateDto)}
        onClose={() => setShowPolicyModal(false)}
        onSave={handleSavePolicy}
      />
      <AddImageModal
        show={showAddImageModal}
        onClose={() => setShowAddImageModal(false)}
        onAssign={handleAssignImage}
      />
      <AddFacilityModal
        show={showAddFacilityModal}
        onClose={() => setShowAddFacilityModal(false)}
        onAssign={handleAssignFacility}
      />
    </div>
  );
};

export default AccommodationDetail;
