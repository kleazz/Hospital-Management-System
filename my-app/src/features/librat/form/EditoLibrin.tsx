import React, { useState, useRef } from "react";
import { ILibri } from "../../../app/layout/models/libri";
import { Dialog } from "primereact/dialog";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { AutoComplete } from "primereact/autocomplete";
import Form from "react-bootstrap/esm/Form";

interface IProps {
  libri: ILibri;
  editLibri: (libri: ILibri) => void; // This will be the React Query mutation function
  show: boolean;
  onHide: () => void;
}

const EditoLibrin: React.FC<IProps> = ({
  show,
  onHide,
  libri: initialFormState,
  editLibri,
}) => {
  // Initialize form state with the current `libri` values
  const [libri, setLibri] = useState<ILibri>(initialFormState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handlers for input fields
  const handleTitulliChange = (e: { value: string }) => {
    setLibri({ ...libri, titulli: e.value });
  };

  const handlePershkrimiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLibri({ ...libri, pershkrimi: e.target.value });
  };

  const handleSasiaChange = (e: InputNumberValueChangeEvent) => {
    setLibri({ ...libri, sasia: e.value as number });
  };

  const handleFotojaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const imageUrl = ev.target?.result as string;
        setLibri({ ...libri, fotoja: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Use the `editLibri` prop to trigger the React Query mutation
    editLibri(libri);
    onHide(); // Close the modal after submitting
  };

  return (
    <Dialog header="Edito Librin" visible={show} style={{ width: '30vw' }} onHide={onHide}>
      <label>Titulli</label>
      <div className="modal-flex">
        <AutoComplete value={libri.titulli} onChange={handleTitulliChange} />
      </div>

      <label>Përshkrimi</label>
      <div className="modal-flex">
        <InputTextarea value={libri.pershkrimi} onChange={handlePershkrimiChange} rows={5} cols={50} />
      </div>

      <Form.Label>Kopertina</Form.Label>
      <Form.Control
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={handleFotojaChange}
      />

      <label>Sasia</label>
      <div className="modal-flex">
        <InputNumber value={libri.sasia} onValueChange={handleSasiaChange} />
      </div>

      <div className="modal-btn">
        <button className="submitbtn" onClick={handleSubmit}>Ruaj Ndryshimet</button>
      </div>
    </Dialog>
  );
};

export default EditoLibrin;
