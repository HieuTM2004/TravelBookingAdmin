interface Payment {
  id: string;
  user: string;
  amount: string;
  package: string;
  date: string;
  status: string;
}

interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ payment }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            {payment.user} - {payment.package}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Amount: {payment.amount}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Date: {payment.date}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Status: {payment.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
