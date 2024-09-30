import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ILibri } from "../../../app/layout/models/libri";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { IAutori } from "../../../app/layout/models/autori";
import agent from "../../../app/layout/api/agent";
import { ILibriRequest } from "../../../app/layout/models/libriRequest";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";
import { imageDb } from "../FireBaseConfig";
import { v4 } from "uuid"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

interface IProps {
  libri: ILibri;
  createLibri: (libri: ILibriRequest) => void;
  show: boolean;
  onHide: () => void;
}

const KrijoLibrin: React.FC<IProps> = ({ show, onHide, createLibri }) => {
  const [libri, setLibri] = useState<ILibri>({
    isbn: "",
    titulli: "",
    pershkrimi: "",
    fotoja: "",
    sasia: 0 as number,
  });

  const [autoret, setAutoret] = useState<IAutori[]>([]);
  const [kategorite, setKategorite] = useState<IKategoria[]>([]);
  const [img, setImg] = useState<Blob | null>(null); // Use Blob | null
  const [selectedKategories, setSelectedKategories] = useState<IKategoria[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<IAutori[]>([]);

  useEffect(() => {
    // Fetch data from the API
    agent.Autoret.list()
      .then((response: IAutori[]) => {
        setAutoret(response);
      })
      .catch((error) => {
        console.error("Error fetching authors: ", error);
      });

    agent.Kategorite.list()
      .then((response: IKategoria[]) => {
        setKategorite(response);
      })
      .catch((error) => {
        console.error("Error fetching Kategoria options: ", error);
      });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImg(file); // Set the file as Blob
    }
  };

  const handleSubmit = async () => {
    let imageUrl: string | undefined;
  
    if (img) {
      try {
        const imgRef = ref(imageDb, `files/${v4()}`);
        await uploadBytes(imgRef, img);
        console.log('Image uploaded successfully');
  
        // Get the download URL
        imageUrl = await getDownloadURL(imgRef);
        console.log('Image URL:', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  
    const libriRequest: ILibriRequest = {
      libri: { ...libri, fotoja: imageUrl || libri.fotoja },
      kategorite: selectedKategories.map((kategoria) => kategoria.emriKategorise),
      autoret: selectedAuthors.map((autori) => autori.emri + ' ' + autori.mbiemri),
    };
  
    console.log(libriRequest);
  
    createLibri(libriRequest);
    onHide();
  };
  
  return (
    <>
      <Dialog header="Krijo Librin" visible={show} style={{ width: '30vw' }} onHide={onHide}>
        <label>ISBN</label>
        <div className="modal-flex">
          <AutoComplete value={libri.isbn} onChange={(e) => setLibri({ ...libri, isbn: e.target.value })} />
        </div>
        <label>Titulli</label>
        <div className="modal-flex">
          <AutoComplete value={libri.titulli} onChange={(e) => setLibri({ ...libri, titulli: e.target.value })} />
        </div>
        <label>Përshkrimi</label>
        <div className="modal-flex">
          <InputTextarea value={libri.pershkrimi} onChange={(e) => setLibri({ ...libri, pershkrimi: e.target.value })} rows={5} cols={50} />
        </div>
        <Form.Label>Kopertina</Form.Label>
        <Form.Control
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
        />
        <label>Sasia</label>
        <div className="modal-flex">
          <InputNumber value={libri.sasia} onValueChange={(e) => setLibri({ ...libri, sasia: e.target.value as number })} />
        </div>
        <label>Kategoritë</label>
        <div className="modal-flex">
          <MultiSelect
            value={selectedKategories}
            onChange={(e) => setSelectedKategories(e.value)}
            options={kategorite.map((kategoria) => ({
              label: kategoria.emriKategorise,
              value: kategoria,
              key: kategoria.kategoriaId,
            }))}
            optionLabel="label"
            display="chip"
            placeholder="Selekto kategoritë"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
        <label>Autorët</label>
        <div className="modal-flex">
          <MultiSelect
            value={selectedAuthors}
            onChange={(e) => setSelectedAuthors(e.value)}
            options={autoret.map((autori) => ({
              label: autori.emri + ' ' + autori.mbiemri,
              value: autori,
              key: autori.autoriId,
            }))}
            optionLabel="label"
            filter
            placeholder="Selekto Autorët"
            maxSelectedLabels={3}
            className="w-full md:w-20rem"
          />
        </div>
        <div className="modal-btn">
          <button className="submitbtn" onClick={handleSubmit}>Ruaj</button>
        </div>
      </Dialog>
    </>
  );
};

export default KrijoLibrin;

