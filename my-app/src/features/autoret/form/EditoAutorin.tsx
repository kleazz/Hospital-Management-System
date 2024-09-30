import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { IAutori } from "../../../app/layout/models/autori";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";

interface IProps {
  autori: IAutori;
  editAutori: (autori: IAutori) => void;
  show: boolean;
  onHide: () => void;
}

const EditoAutorin: React.FC<IProps> = ({
  show,
  onHide,
  autori: initialFormState,
  editAutori,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        autoriId: 0,
        emri: "",
        mbiemri: "",
      };
    }
  };

  const [autori, setAutori] = useState<IAutori>(initializeForm);

  const handleEmriChange = (e: { value: string }) => {
    setAutori({ ...autori, emri: e.value });
  };

  const handleMbiemriChange = (e: { value: string }) => {
    setAutori({ ...autori, mbiemri: e.value });
  };

  const handleSubmit = () => {
    editAutori(autori);
    onHide();
  };

  return (
    <>
    <Dialog header="Edito Kategorinë" visible={show} style={{ width: '30vw' }} onHide={onHide}>
      <label>Emri</label>
      <div className="modal-flex">
    <AutoComplete value={autori.emri} onChange={handleEmriChange} />
    </div>
    <label>Mbiemri</label>
      <div className="modal-flex">
    <AutoComplete value={autori.mbiemri} onChange={handleMbiemriChange} />
    </div>
    <div className="modal-btn">
            <button className="submitbtn" onClick={handleSubmit}>Ruaj Ndryshimet</button>
        </div>
    </Dialog>
    {/* <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{"Edito Autorin"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formEmriE">
            <Form.Label>Emri</Form.Label>
            <Form.Control
              type="text"
              name="emri"
              value={autori.emri}
              onChange={handleInputChange}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="formMbiemriE">
            <Form.Label>Mbiemri</Form.Label>
            <Form.Control
              type="text"
              name="mbiemri"
              value={autori.mbiemri}
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

export default EditoAutorin;
