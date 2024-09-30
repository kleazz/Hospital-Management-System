import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";

interface IProps {
  kategoria: IKategoria;
  editKategoria: (kategoria: IKategoria) => void;
  show: boolean;
  onHide: () => void;
}

const EditoKategorine: React.FC<IProps> = ({
  show,
  onHide,
  kategoria: initialFormState,
  editKategoria,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        kategoriaId: 0,
        emriKategorise: "",
      };
    }
  };

  const [kategoria, setKategoria] = useState<IKategoria>(initializeForm);

  const handleInputChange = (e: { value: string }) => {
    setKategoria({ ...kategoria, emriKategorise: e.value });
  };

  const handleSubmit = () => {
    editKategoria(kategoria);
    onHide();
  };

  return (
    <>
    <Dialog header="Edito Kategorinë" visible={show} style={{ width: '30vw' }} onHide={onHide}>
      <label>Emri</label>
      <div className="modal-flex">
    <AutoComplete value={kategoria.emriKategorise} onChange={handleInputChange} />
    </div>
    <div className="modal-btn">
            <button className="submitbtn" onClick={handleSubmit}>Ruaj Ndryshimet</button>
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

export default EditoKategorine;
