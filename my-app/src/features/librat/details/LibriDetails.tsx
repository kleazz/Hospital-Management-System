import React, { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ILibri } from "../../../app/layout/models/libri";
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Nullable } from "primereact/ts-helpers";
import { ScrollPanel } from "primereact/scrollpanel";
import agent from "../../../app/layout/api/agent";
import { IAutori } from "../../../app/layout/models/autori";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { Chip } from "primereact/chip";
import Reviews from "../../reviews/dashboard/Reviews";
import { Button } from "primereact/button";
import Cookies from 'js-cookie';

const LibriDetails: React.FC = () => {
  const { libriIsbn } = useParams<{ libriIsbn: string }>();

  const [libri, setLibri] = useState<ILibri | null>(null);
  const [autoret, setAutoret] = useState<string | null>(null);
  const [kategorite, setKategorite] = useState<string | null>(null);
  const [selectedDueDate, setSelectedDueDate] = useState<Nullable<Date>>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const handleSave = async () => {
    if (libri) {
      const userId = Cookies.get("userId");
      const username = Cookies.get("username");
      const token = Cookies.get("token"); // Assuming your JWT is stored in a cookie named 'token'

      const formattedDueDate = new Date(selectedDueDate!.getTime() - selectedDueDate!.getTimezoneOffset() * 60000);
      const reservationData = {
        username: username,
        id: userId,
        isbn: libriIsbn,
        dueDate: formattedDueDate.toISOString(),
      };

      try {
        const response = await fetch("https://localhost:7226/api/Rezervimi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add JWT token
          },
          body: JSON.stringify(reservationData),
        });

        if (response.ok) {
          fetchBookDetails();
          console.log("Reservation created");
        } else {
          console.log("Error creating reservation");
        }
      } catch (error) {
        console.log("Error creating reservation", error);
      }
    }

    setVisible(false);
  };

  const getAutoretForLibri = async (isbn: string): Promise<string> => {
    const autoretForLibri = await agent.Librat.getAutoriNgaLibri(isbn);
    const autoretString = autoretForLibri.map((autori: IAutori) => `${autori.emri} ${autori.mbiemri}`).join(", ");
    return autoretString;
  };

  const getKategoriteForLibri = async (isbn: string): Promise<string> => {
    const kategoriteForLibri = await agent.Librat.getKategoriaNgaLibri(isbn);
    const kategoriteString = kategoriteForLibri.map((kategoria: IKategoria) => kategoria.emriKategorise).join(", ");
    return kategoriteString;
  };

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(
        `https://localhost:7226/api/Libri/${libriIsbn}`,
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("accessToken")}`, // Add JWT token
          },
        }
      );

      if (response.ok) {
        const bookData = await response.json();
        setLibri(bookData);

        const autoretString = await getAutoretForLibri(bookData.isbn);
        setAutoret(autoretString);

        const kategoriteString = await getKategoriteForLibri(bookData.isbn);
        setKategorite(kategoriteString);
      } else {
        console.log("Error fetching book details");
      }
    } catch (error) {
      console.log("Error fetching book details", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBookDetails();
  }, [libriIsbn]);

  const getMinDate = (): Date => {
    const today = new Date();
    return today;
  };
  
  const getMaxDate = (): Date => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    return maxDate;
  };

  return (
    <>
      <div className="details-container">
        {libri && (
          <div style={{ height: "600px", width: "35cm", backgroundColor: "white", padding: "1cm" }}>
            <Row>
              {libri.sasia === 0 && (
                <h6 className="warning-h6"><b>Nuk ka sasi nga ky libër.</b></h6>
              )}
              <Col xs={12} md={4}>
                <img
                  src={libri.fotoja}
                  style={{
                    marginTop: "1cm",
                    height: "450px",
                    width: "325px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  alt={libri.titulli}
                  className="img-fluid"
                />
              </Col>
              <Col
                xs={12}
                md={8}
                style={{ marginTop: "1cm", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              >
                <h1 className="details-h1"><b>{libri.titulli}</b></h1>
                <h4>{autoret}</h4>
                <h6 className="details-h6">
                  {(kategorite ?? "").split(', ').map((kategoria, index) => (
                    <Chip key={index} label={kategoria} className="p-mr-2" style={{ marginRight: "10px" }} />
                  ))}
                </h6>
                <ScrollPanel style={{ width: '100%', height: '190px' }} className="custombar2">
                  <p>{libri.pershkrimi}</p>
                </ScrollPanel>
                {localStorage.getItem("role") !== "admin" && (
                  <>
                    <div className="modal-btn">
                      <Button className="submitbtn rezervo-btn" onClick={() => setVisible(true)} disabled={libri.sasia === 0}>
                        Rezervo
                      </Button>
                    </div>
                    <div className="modal-btn">
                      <Button className="submitbtn blej-btn" disabled={libri.sasia === 0}>
                        Blej
                      </Button>
                    </div>
                  </>
                )}
              </Col>
            </Row>
          </div>
        )}

        <Dialog header="Rezervo Librin" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
          <label>Due Date</label>
          <div className="modal-flex">
            <Calendar
              className="custom-calendar"
              minDate={getMinDate()}
              maxDate={getMaxDate()}
              value={selectedDueDate}
              onChange={(e) => setSelectedDueDate(e.value)}
            />
          </div>
          <div className="modal-btn">
            <button className="submitbtn" onClick={() => { handleSave(); setVisible(false); }}>Ruaj</button>
          </div>
        </Dialog>
      </div>
      <Reviews isbn={libri?.isbn}></Reviews>
    </>
  );
};

export default LibriDetails;
