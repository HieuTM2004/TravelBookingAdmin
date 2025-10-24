import Button from "../ui/button/Button";

interface Rating {
  id: string;
  user: string;
  book: string;
  rating: string;
  content: string;
  date: string;
}

interface RatingCardProps {
  rating: Rating;
  onDelete: () => void;
}

const RatingCard: React.FC<RatingCardProps> = ({ rating, onDelete }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            {rating.user} rated {rating.book}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {rating.rating}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {rating.content}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Posted on {rating.date}
          </p>
        </div>
        <Button size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default RatingCard;
