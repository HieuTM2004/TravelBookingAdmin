// PaymentMethods.tsx - Main list page (modern layout with search)
import React, { useState, useEffect } from "react";
import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
} from "../../api/paymentmethodAPI";
import type {
  PaymentMethodCreateDto,
  PaymentMethodUpdateDto,
  PaymentMethodDto,
} from "../../types/paymentmethod.types";
import PaymentMethodTable from "../../components/payments/PaymentMethodTable";
import PaymentMethodModal from "../../components/payments/PaymentMethodModal";

const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PaymentMethodCreateDto>({
    name: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // Search by name

  // Fetch all payment methods
  useEffect(() => {
    fetchPaymentMethods();
  }, [searchTerm]);

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const data = await getPaymentMethods();
      let filtered = data;
      if (searchTerm.trim()) {
        filtered = data.filter((method) =>
          method.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );
      }
      setPaymentMethods(filtered);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePaymentMethod(editingId, {
          name: formData.name,
        } as PaymentMethodUpdateDto);
      } else {
        await createPaymentMethod(formData);
      }
      fetchPaymentMethods(); // Refresh list
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: "" });
    } catch (error) {
      console.error("Error saving payment method:", error);
    }
  };

  // Handle edit (fetch full detail if needed, but simple here)
  const handleEdit = async (paymentMethod: PaymentMethodDto) => {
    try {
      setEditingId(paymentMethod.id);
      const fullDetail = await getPaymentMethodById(paymentMethod.id);
      setFormData({ name: fullDetail.name });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching payment method details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this payment method?")
    ) {
      try {
        await deletePaymentMethod(id);
        fetchPaymentMethods();
      } catch (error) {
        console.error("Error deleting payment method:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Manage payment method options for bookings
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition-all hover:shadow-lg flex items-center space-x-2"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Add New</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search Methods
        </label>
        <input
          type="text"
          placeholder="Search by method name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <PaymentMethodTable
        paymentMethods={paymentMethods}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PaymentMethodModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ name: "" });
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
      />
    </div>
  );
};

export default PaymentMethods;
