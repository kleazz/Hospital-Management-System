import { useEffect, useState } from "react";
import { IReview } from "../../../app/layout/models/review";
import agent from "../../../app/layout/api/agent";
import ReviewList from "./ReviewList";

const Reviews = ({ isbn }: { isbn: string | undefined }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<IReview | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleCreateReview = (review: IReview) => {
    agent.Reviews.create(review).then((response) => {
      setReviews([...reviews, response]);
      setSelectedReview(response.data);
    });
  };

  const handleEditReview = (review: IReview) => {
    agent.Reviews.update(review).then(() => {
      setReviews([...reviews.filter((r) => r.reviewId !== review.reviewId), review]);
      setSelectedReview(review);
    });
  };

  const handleDeleteReview = (reviewId: number) => {
    agent.Reviews.delete(reviewId).then(() => {
      setReviews([...reviews.filter((r) => r.reviewId !== reviewId)]);
    });
  };

  const handleSelectReview = (reviewId: number) => {
    setSelectedReview(reviews.filter((r) => r.reviewId === reviewId)[0]);
    setEditMode(true);
  };

  useEffect(() => {
    agent.Reviews.list().then((response: IReview[]) => {
      setReviews(response);
    });
  }, []);

  return (
    <ReviewList
      reviews={reviews}
      key={(selectedReview && selectedReview.reviewId) || 0}
      review={selectedReview!}
      isbn={isbn}
      createReview={handleCreateReview}
      selectReview={handleSelectReview}
      deleteReview={handleDeleteReview}
      selectedReview={selectedReview!}
      setSelectedReview={setSelectedReview}
      editReview={handleEditReview} 
      editMode={editMode} 
      setEditMode={setEditMode}    />
  );
};

export default Reviews;
