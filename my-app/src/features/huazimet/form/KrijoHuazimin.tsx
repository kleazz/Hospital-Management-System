import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { IHuazimi } from "../../../app/layout/models/huazimi";
import { Dropdown } from "primereact/dropdown";
import { ILibri } from "../../../app/layout/models/libri";
import { ILexuesi } from "../../../app/layout/models/lexuesi";
import agent from "../../../app/layout/api/agent";

interface IProps {
  huazimi: IHuazimi;
  createHuazimi: (huazimi: IHuazimi) => void;
  show: boolean;
  onHide: () => void;
}

const KrijoHuazimin: React.FC<IProps> = ({
  show,
  onHide,
  createHuazimi,
}) => {
  const [huazimi, setHuazimi] = useState<IHuazimi>({
    huazimiId: 0,
    currentDate: new Date(),
    dueDate: new Date(),
    returnDate: new Date(),
    isReturned: false,
    hasRezervim: false,
    isbn: "",
    id: "",
    username: ""
  });

  const[librat, setLibrat] = useState<ILibri[]>([]);
  const[lexuesit, setLexuesit] = useState<ILexuesi[]>([]);
  const [selectedLibri, setSelectedLibri] = useState<ILibri | null>(null);
  const[selectedLexuesi, setSelectedLexuesi] = useState<ILexuesi | null>(null);

  useEffect(() => {
    agent.Librat.list()
    .then((response: ILibri[]) => {
        setLibrat(response);
    })
    .catch((error)=>{
        console.error("Error fetching librat: ", error);
    })

    agent.Lexuesit.list()
    .then((response: ILexuesi[]) => {
        setLexuesit(response);
    })
    .catch((error) => {
        console.error("Error fetching lexuesit: ", error);
    })
  }, []);


  const handleSubmit = () => {
    // Ensure that a libri and lexuesi are selected before creating the huazimi
    if (!selectedLibri || !selectedLexuesi) {
      console.error("Please select a libri and a user.");
      return;
    }

    if (selectedLibri.sasia === 0) {
      console.error("Cannot create huazimi for a libri with 0 sasia.");
      return;
  }
    // Calculate dueDate as 15 days from currentDate
    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setDate(currentDate.getDate() + 15);

    // Create the newHuazimi object with the calculated values
    let newHuazimi: IHuazimi = {
        huazimiId: 0,
        currentDate: currentDate, // Convert to string
        dueDate: dueDate, // Convert to string
        returnDate: new Date(),
        isReturned: false,
        hasRezervim: false,
        isbn: selectedLibri.isbn, // Use the selected libri's isbn
        id: selectedLexuesi.id, // Use the selected user's id
        username: selectedLexuesi.username,
    };

    console.log(newHuazimi);

    // Call the createHuazimi function with the newHuazimi object
    createHuazimi(newHuazimi);
    // Close the dialog
    onHide();
  };

  return (
    <>
    <Dialog header="Krijo Huazimin" visible={show} style={{ width: '30vw' }} onHide={onHide}>
      <label>Libri</label>
      <div className="modal-flex">
      <Dropdown value={selectedLibri} onChange={(e) => setSelectedLibri(e.value)} options={librat.map((libri) => ({
        label: libri.titulli + " " + libri.isbn + " Sasia:"+libri.sasia,
        value: libri,
        key: libri.isbn
      }))} optionLabel="label" 
                placeholder="Zgjedh librin" className="w-full md:w-14rem" />
    </div>
    <label>User</label>
      <div className="modal-flex">
      <Dropdown value={selectedLexuesi} onChange={(e) => setSelectedLexuesi(e.value)} options={lexuesit.map((lexuesi) => ({
        label: lexuesi.username,
        value: lexuesi,
        key: lexuesi.username,
      }))} optionLabel="label" 
                placeholder="Zgjedh userin" className="w-full md:w-20rem" />
    </div>
    <div className="modal-btn">
            <button className="submitbtn" onClick={handleSubmit}>Ruaj</button>
        </div>
    </Dialog>
    </>
  );
};

export default KrijoHuazimin;
