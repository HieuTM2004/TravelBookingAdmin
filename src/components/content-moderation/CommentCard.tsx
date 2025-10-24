import Button from "../ui/button/Button";

interface Comment {
  id: string;
  user: string;
  book: string;
  content: string;
  date: string;
}

interface CommentCardProps {
  comment: Comment;
  onDelete: () => void;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onDelete }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">
            {comment.user} commented on {comment.book}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {comment.content}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Posted on {comment.date}
          </p>
        </div>
        <Button size="sm" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CommentCard;
