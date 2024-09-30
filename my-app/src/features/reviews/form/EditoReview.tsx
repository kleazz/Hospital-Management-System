import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { IReview } from "../../../app/layout/models/review";

interface IProps {
  review: IReview;
  editReview: (review: IReview) => void;
  show: boolean;
  onHide: () => void;
}

const EditoReview: React.FC<IProps> = ({
  show,
  onHide,
  review: initialFormState,
  editReview,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        reviewId: 0,
        username: "",
        isbn: "",
        komenti: "",
        date: new Date(),
        isEdited: false,
        id: "",
        rId: 0
      };
    }
  };

  const [review, setReview] = useState<IReview>(initializeForm);

  const handleSubmit = () => {
    editReview(review);
    onHide();
  };

  return (
    <>
    <Dialog header="Edito Review" visible={show} style={{ width: '30vw' }} onHide={onHide}>
      <div className="modal-flex" style={{marginTop: "5px"}}>
      <div className="input-box">
         <input type="text" className="input-field" id="username" required value={review.komenti} onChange={(e) => setReview({ ...review, komenti: e.target.value , isEdited: true  })}
   ></input>
         <label>Edit review</label>
         </div>
    </div>
    <div className="modal-btn">
            <button className="submitbtn" onClick={handleSubmit}>Ruaj</button>
        </div>
    </Dialog>
    {/* <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Edito Kategorine"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formKategoriaE">
            <Form.Label>Emri</Form.Label>
            <Form.Control
              type="text"
              name="emriKategorise"
              value={kategoria.emriKategorise}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Mbyll
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {"Ruaj Ndryshimet"}
        </Button>
      </Modal.Footer>
    </Modal> */}
    </>
  );
};

export default EditoReview;
