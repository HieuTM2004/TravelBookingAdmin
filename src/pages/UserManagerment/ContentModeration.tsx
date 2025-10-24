import PageBreadcrumb from "../../components/common/PageBreadcrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import RatingCard from "../../components/content-moderation/RatingCard";
import CommentCard from "../../components/content-moderation/CommentCard";
import ReportCard from "../../components/content-moderation/ReportCard";
import { useState } from "react";

// Dữ liệu giả lập
const ratings = [
  {
    id: "1",
    user: "john_doe",
    book: "Book 1",
    rating: "4/5",
    content: "Great book!",
    date: "2025-05-01",
  },
  {
    id: "2",
    user: "jane_smith",
    book: "Book 2",
    rating: "3/5",
    content: "Inappropriate content",
    date: "2025-05-02",
  },
];

const comments = [
  {
    id: "1",
    user: "john_doe",
    book: "Book 1",
    content: "I loved this chapter!",
    date: "2025-05-01",
  },
  {
    id: "2",
    user: "jane_smith",
    book: "Book 2",
    content: "Offensive comment",
    date: "2025-05-02",
  },
];

const reports = [
  {
    id: "1",
    user: "john_doe",
    reportedBy: "admin",
    reason: "Inappropriate behavior",
    details: "Posted offensive comments on Book 1.",
    date: "2025-05-01",
    status: "pending",
    isBlocked: false,
  },
  {
    id: "2",
    user: "jane_smith",
    reportedBy: "user123",
    reason: "Spam",
    details: "Posted spam ratings on multiple books.",
    date: "2025-05-02",
    status: "resolved",
    isBlocked: true,
  },
];

export default function ContentModeration() {
  const [ratingsList, setRatingsList] = useState(ratings);
  const [commentsList, setCommentsList] = useState(comments);
  const [reportsList, setReportsList] = useState(reports);

  const handleDeleteRating = (id: string) => {
    setRatingsList((prev) => prev.filter((rating) => rating.id !== id));
  };

  const handleDeleteComment = (id: string) => {
    setCommentsList((prev) => prev.filter((comment) => comment.id !== id));
  };

  const handleUpdateReport = (id: string, updatedReport: any) => {
    setReportsList((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, ...updatedReport } : report
      )
    );
  };

  return (
    <>
      <PageMeta
        title="Content Moderation"
        description="Manage user content and reports"
      />
      <PageBreadcrumb pageTitle="Content Moderation" />
      <div className="space-y-6">
        <ComponentCard title="Ratings Moderation">
          <div className="space-y-4">
            {ratingsList.length > 0 ? (
              ratingsList.map((rating) => (
                <RatingCard
                  key={rating.id}
                  rating={rating}
                  onDelete={() => handleDeleteRating(rating.id)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No ratings to moderate.
              </p>
            )}
          </div>
        </ComponentCard>

        <ComponentCard title="Comments Moderation">
          <div className="space-y-4">
            {commentsList.length > 0 ? (
              commentsList.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onDelete={() => handleDeleteComment(comment.id)}
                />
              ))
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No comments to moderate.
              </p>
            )}
          </div>
        </ComponentCard>

        <ComponentCard title="User Reports">
          <div className="space-y-4">
            {reportsList.length > 0 ? (
              reportsList.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onUpdate={(updatedReport) =>
                    handleUpdateReport(report.id, updatedReport)
                  }
                />
              ))
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No reports to review.
              </p>
            )}
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
