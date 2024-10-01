import React, { useState, ChangeEvent } from "react";
import { Dialog } from "primereact/dialog";
import { IRezervimi } from "../../../app/layout/models/rezervimi";
import { Form } from "react-bootstrap";

interface IProps {
  rezervimi: IRezervimi;
  editRezervimi: (rezervimi: IRezervimi) => void;
  show: boolean;
  onHide: () => void;
}

const EditoRezervimin: React.FC<IProps> = ({
  show,
  onHide,
  rezervimi: initialFormState,
  editRezervimi,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        rezervimiId: 0,
        dueDate: new Date().toISOString().split("T")[0], // Initialize with a Date object
        isbn: "",
        id: "",
        username: ""
      };
    }
  };

  const [rezervimi, setRezervimi] = useState<IRezervimi>(initializeForm);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value; // Keep it as a string
    setRezervimi({ ...rezervimi, dueDate: selectedDate });
  };

  const handleSubmit = () => {
    editRezervimi(rezervimi);
    onHide();
  };

  return (
    <>
      <Dialog header="Edito Rezervimin" visible={show} style={{ width: '30vw' }} onHide={onHide}>
        <label>Emri</label>
        <div className="modal-flex">
          <Form.Control
            type="date"
            value={rezervimi.dueDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="modal-btn">
          <button className="submitbtn" onClick={handleSubmit}>
            Ruaj Ndryshimet
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default EditoRezervimin;
