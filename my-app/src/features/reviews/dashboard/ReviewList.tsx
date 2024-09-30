import React, { useEffect, useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IReview } from "../../../app/layout/models/review";
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Toast } from 'primereact/toast';
import EditoReview from "../form/EditoReview";
import Cookies from "js-cookie";

interface IProps {
    reviews: IReview[];
    review: IReview;
    createReview: (review: IReview) => void;
    selectReview: (reviewId: number) => void;
    selectedReview: IReview;
    setSelectedReview: (review: IReview | null) => void;
    deleteReview:(reviewId: number) => void;
    editReview: (review: IReview) => void;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    isbn: string | undefined
  }

const ReviewList: React.FC<IProps> = ({
    reviews,
    createReview,
    selectReview,
    deleteReview,
    isbn,
    editMode,
    setEditMode,
    editReview,
    selectedReview
}) => {
  const [review, setReview] = useState<IReview>({
    reviewId: 0,
    // rId: 0,
    username: "",
    isbn: "",
    komenti: "",
    date: new Date(),
    isEdited: false,
    id: ""
    });

    const [displayedReviews, setDisplayedReviews] = useState(5);

    const seeMoreReviews =() => {
        setDisplayedReviews((prev) => prev + 5);
    }

    const seeLessReviews=() => {
        setDisplayedReviews(5);
    }

  const handleSubmit = () => {
    let storedUsername = Cookies.get("username");
    let storedId = Cookies.get("userId");

    let newReview = {
      ...review,
      username: storedUsername || "",
      id: storedId || "",
      isbn: isbn || "",
    };

    console.log(newReview);
    createReview(newReview);

    // Increment the reviewId counter for the next review

    setReview({ ...review, komenti: "" });
  };
  const handleCancel = () => {
    setReview({ ...review, komenti: "" });
  };
  
  const filteredReviews = reviews.filter((r) => r.isbn === isbn);
  const storedRole = Cookies.get("role");
  const isAdmin = storedRole === "admin";

  return (
    <>
     <div className="details-container" style={{alignItems: "flex-start", marginTop: "15px", minHeight: "5cm"}}>
    <div style={{width: "35cm", padding: "1cm", paddingBottom: "2cm"}}>
    <h3 style={{color: "#1c2c3c"}}><b>Reviews</b></h3>
    {localStorage.getItem("role") !== "admin" && (
     <Row style={{marginTop: "30px"}}>
      <Col>
    <div className="input-box">
         <input type="text" className="input-field" id="username" required value={review.komenti} onChange={(e) => setReview({ ...review, komenti: e.target.value })}
   ></input>
         <label>Write a review</label>
         </div>
         </Col>
         <Col xs={1}>
         <div className="input-box">
         <button className="submitbtn cancelbtn" onClick={handleCancel} >Cancel</button>
       </div>
       </Col>
         <Col xs={1}>
         <div className="input-box">
         <button className="submitbtn" onClick={handleSubmit}>Send</button>
       </div>
       </Col>
       </Row>
       )}
   {filteredReviews.length === 0 && <p>Libri nuk ka reviews.</p>}
{filteredReviews.slice(0, displayedReviews).map((r, index) => (
  <div key={r.reviewId} className="review-wrapper">
    <div className="review-top">
      <div className="review-edited">
        <b className="review-user">{r.username}</b>
        {r.isEdited && " (edited)"}
      </div>
      <div className="review-right">
        {isAdmin ? (
          <div>
            <button className="submitbtn delbtn" onClick={() => deleteReview(r.reviewId)}>
              <b><i className="pi pi-trash"></i></b>
            </button>
          </div>
        ) : (
          r.id === localStorage.getItem("userId") && (
            <div className="review-right">
              <button className="submitbtn editbtn" onClick={() => selectReview(r.reviewId)}>
                <b><i className="pi pi-pencil"></i></b>
              </button>
              <button className="submitbtn delbtn" onClick={() => deleteReview(r.reviewId)}>
                <b><i className="pi pi-trash"></i></b>
              </button>
            </div>
          )
        )}
      </div>
    </div>
    <div className="review-bottom">
      <div className="review-comment">{r.komenti}</div>
    </div>
  </div>
))}
{filteredReviews.length > 5 && (
  <div style={{ textAlign: 'center', margin: '10px' }}>
    {displayedReviews < filteredReviews.length ? (
      <button className="btn-link" onClick={seeMoreReviews}>Show More</button>
    ) : (
      <button className="btn-link" onClick={seeLessReviews}>Show Less</button>
    )}
  </div>
)}
</div>
</div>
{editMode && selectedReview && (
  <EditoReview
    show={true}
    onHide={() => setEditMode(false)}
    review={selectedReview!}
    editReview={editReview}
  />
)}
</>
);
};

export default ReviewList;
