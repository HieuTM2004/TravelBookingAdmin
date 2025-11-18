// PaymentRecords.tsx
import React, { useState, useEffect } from "react";
import {
  getPaymentRecords,
  createPaymentRecord,
  updatePaymentRecord,
  deletePaymentRecord,
  getPaymentRecordById,
} from "../../api/paymentrecordAPI";
import {
  PaymentRecordCreateDto,
  PaymentRecordDto,
  PaymentRecordUpdateDto,
} from "../../types/paymentrecord..type";
import PaymentRecordTable from "../../components/payments/PaymentRecordTable";
import PaymentRecordModal from "../../components/payments/PaymentRecordModal";

const PaymentRecords: React.FC = () => {
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecordDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PaymentRecordCreateDto>({
    roomId: "",
    paymentMethodId: "",
    status: 1, // Default success
  });
  const [searchTerm, setSearchTerm] = useState(""); // Search by name/ID
  const [filterStatus, setFilterStatus] = useState<number | "all">("all"); // Filter by status

  // Fetch all payment records
  useEffect(() => {
    fetchPaymentRecords();
  }, [searchTerm, filterStatus]);

  const fetchPaymentRecords = async () => {
    setLoading(true);
    try {
      const data = await getPaymentRecords();
      let filtered = data;
      if (searchTerm.trim()) {
        filtered = data.filter(
          (record) =>
            record.roomName
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim()) ||
            record.paymentMethodName
              .toLowerCase()
              .includes(searchTerm.toLowerCase().trim()) ||
            record.id.toLowerCase().includes(searchTerm.toLowerCase().trim())
        );
      }
      if (filterStatus !== "all") {
        filtered = filtered.filter((record) => record.status === filterStatus);
      }
      setPaymentRecords(filtered);
    } catch (error) {
      console.error("Error fetching payment records:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updatePaymentRecord(
          editingId,
          formData as PaymentRecordUpdateDto
        );
      } else {
        await createPaymentRecord(formData);
      }
      fetchPaymentRecords(); // Refresh list
      setShowModal(false);
      setEditingId(null);
      setFormData({ roomId: "", paymentMethodId: "", status: 1 });
    } catch (error) {
      console.error("Error saving payment record:", error);
    }
  };

  // Handle edit (fetch full detail)
  const handleEdit = async (paymentRecord: PaymentRecordDto) => {
    try {
      setEditingId(paymentRecord.id);
      const fullDetail = await getPaymentRecordById(paymentRecord.id);
      setFormData({
        roomId: fullDetail.roomId,
        paymentMethodId: fullDetail.paymentMethodId,
        status: fullDetail.status,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching payment record details:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this payment record?")
    ) {
      try {
        await deletePaymentRecord(id);
        fetchPaymentRecords();
      } catch (error) {
        console.error("Error deleting payment record:", error);
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Records</h1>
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

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by room, method, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value === "all" ? "all" : parseInt(e.target.value)
              )
            }
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="0">Pending</option>
            <option value="1">Success</option>
          </select>
        </div>
      </div>

      <PaymentRecordTable
        paymentRecords={paymentRecords}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PaymentRecordModal
        show={showModal}
        editingId={editingId}
        formData={formData}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ roomId: "", paymentMethodId: "", status: 1 });
        }}
        onSubmit={handleSubmit}
        onFormDataChange={setFormData}
      />
    </div>
  );
};

export default PaymentRecords;
