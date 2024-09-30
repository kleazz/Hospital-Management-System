import React, { useEffect, useState } from "react";
import { IRezervimi } from "../../app/layout/models/rezervimi";
import { Avatar } from "primereact/avatar";
import { Fieldset } from "primereact/fieldset";
import { DataView } from "primereact/dataview";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ILibri } from "../../app/layout/models/libri";
import { Button } from "primereact/button";
import { IHuazimi } from "../../app/layout/models/huazimi";
import { Panel } from "primereact/panel";
import 'primeicons/primeicons.css';
import { Accordion, AccordionTab } from "primereact/accordion";

interface IProps {
  rezervimet: IRezervimi[];
  huazimet: IHuazimi[];
  librat: ILibri[];
  deleteRezervimi: (id:number) => void
}
const ProfiliDashboard: React.FC<IProps> = ({
  rezervimet,
  huazimet,
  librat,
  deleteRezervimi

}) => {
  const e = localStorage.getItem("username");

  const [displayedReturnedHuazimet, setDisplayedReturnedHuazimet] = useState(3);

  const seeMoreReturnedHuazimet = () => {
    setDisplayedReturnedHuazimet((prev) => prev + 5);
  };

  const seeLessReturnedHuazimet = () => {
    setDisplayedReturnedHuazimet(3);
  };

  const getLibriFotoja = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn)
    return libri? libri.fotoja: "";
  }

  const getLibriTitulli = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn)
    return libri? libri.titulli: "";
  }

  // const [reservations, setReservations] = useState<any>([]);
  

  // useEffect(() => {
  //   fetchReservations();
  // }, []);

  // const fetchReservations = async () => {
  //   try {
  //     const u = localStorage.getItem("userId");
  //     const response = await fetch(
  //       `https://localhost:7226/api/Authenticate/join/${u}`
  //     );
  //     const data = await response.json();
  //     setReservations(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteReservation = async (reservationId: number) => {
  //   try {
  //     await fetch(`https://localhost:7226/api/Rezervimi/${reservationId}`, {
  //       method: "DELETE",
  //     });
  //     fetchReservations();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredReservations = rezervimet.filter((rezervimi) => rezervimi.username === e);
  const filteredHuazimet = huazimet.filter((huazimi) => huazimi.username === e && !huazimi.isReturned);
  const returnedHuazimet = huazimet.filter((huazimi) => huazimi.username === e && huazimi.isReturned);
  
  return (
    <div style={{ marginTop: "25px", padding: "90px", minHeight: "100vh" }}>
    <div className="profile-logo">
      <Avatar label={e ? e.charAt(0).toUpperCase() : ""} size="xlarge" shape="circle" />
      <h3 style={{ marginTop: "20px", marginLeft: "20px", color: "white" }}>{e}</h3>
    </div>
    <Accordion activeIndex={0} className="acc-group">
                <AccordionTab header="Rezervimet aktuale">
    {filteredReservations.length === 0 && <h6> Nuk keni rezervim</h6>}
    {filteredReservations.map((rezervimi, index) => (
      <React.Fragment key={rezervimi.rezervimiId}>
        <div className="reservation-card">
            <div className="card-left">
              <img
                src={getLibriFotoja(rezervimi.isbn)}
                alt="Book Cover"
                style={{ height: "206px", width: "140px" }}
              />
              </div>
              <div className="card-right">
              <h3>{getLibriTitulli(rezervimi.isbn)}</h3>
              <p>Due Date: {formatDate(rezervimi.dueDate)}</p>
            </div>
            <div className="card-column">
              <Button label="Delete" severity="danger" text onClick={() => deleteRezervimi(rezervimi.rezervimiId)} />
            </div>
            </div>
            {index !== filteredReservations.length - 1 && <hr className="divhr"></hr>}
        </React.Fragment>
      ))} 
       </AccordionTab>
       <AccordionTab header="Huazimet aktuale">
       {filteredHuazimet.length === 0 && <h6> Nuk keni huazime</h6>}
      {filteredHuazimet.map((huazimi, index) => (
        <React.Fragment key={huazimi.huazimiId}>
          <div className="reservation-card">
          <div className="card-left">
              <img
                src={getLibriFotoja(huazimi.isbn)}
                alt="Book Cover"
                style={{ height: "206px", width: "140px" }}
              />
              </div>
              <div className="card-right">
              <h3>{getLibriTitulli(huazimi.isbn)}</h3>
              <p>Due Date: {formatDate(huazimi.dueDate.toString())}</p>
            </div>
          </div>
          {index !== filteredHuazimet.length - 1 && <hr></hr>}
        </React.Fragment>
      ))}
      </AccordionTab>
      </Accordion>
      <Accordion>
      <AccordionTab header={<span><i className="pi pi-history" style={{ color: 'black', marginRight: '10px' }}></i> Huazimet paraprake</span>}>
      {/* <h4 className="profile-label"> Huazimet paraprake</h4>
      <hr className="divider-hr"></hr>  */}
      {returnedHuazimet.length === 0 && <h6> Nuk keni huazime</h6>}
      {returnedHuazimet.slice(0, displayedReturnedHuazimet).map((huazimi, index) => (
      <React.Fragment key={huazimi.huazimiId}>
        <div className="reservation-card">
            <div className="card-left">
              <img
                src={getLibriFotoja(huazimi.isbn)}
                alt="Book Cover"
                style={{ height: "206px", width: "140px" }}
              />
              </div>
              <div className="card-right">
              <h3>{getLibriTitulli(huazimi.isbn)}</h3>
              <p>Start Date: {formatDate(huazimi.currentDate.toString())} </p>
              <p>Due Date: {formatDate(huazimi.dueDate.toString())}</p>
              <p>Return Date: {formatDate(huazimi.returnDate.toString())}</p>
            </div>
            </div>
            {((index !== displayedReturnedHuazimet - 1) && (index !== returnedHuazimet.length - 1)) && <hr className="divhr"></hr>}
        </React.Fragment>
        ))}
    {returnedHuazimet.length > 3 && (
          <div style={{ textAlign: 'center', margin: '10px' }}>
            {displayedReturnedHuazimet < returnedHuazimet.length ? (
              <button className="btn-link" onClick={seeMoreReturnedHuazimet}>Show More</button>
            ) : (
              <button className="btn-link" onClick={seeLessReturnedHuazimet}>Show Less</button>
            )}
          </div>
        )}
      </AccordionTab>
      </Accordion>
      </div>
  );
};

export default ProfiliDashboard;
