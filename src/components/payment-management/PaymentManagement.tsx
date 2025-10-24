import ComponentCard from "../../components/common/ComponentCard";
import PaymentCard from "./PaymentCard";

// Dữ liệu giả lập cho thanh toán
const payments = [
  {
    id: "1",
    user: "john_doe",
    amount: "$19.99",
    package: "Premium Monthly",
    date: "2025-05-01",
    status: "Completed",
  },
  {
    id: "2",
    user: "jane_smith",
    amount: "$99.99",
    package: "Premium Yearly",
    date: "2025-05-02",
    status: "Pending",
  },
];

const PaymentManagement: React.FC = () => {
  return (
    <ComponentCard title="Payment Management">
      <div className="space-y-4">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No payments to display.
          </p>
        )}
      </div>
    </ComponentCard>
  );
};

export default PaymentManagement;
