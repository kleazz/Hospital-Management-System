import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IRezervimi } from "../../../app/layout/models/rezervimi";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import { ILibri } from "../../../app/layout/models/libri";
import { IHuazimi } from "../../../app/layout/models/huazimi";

interface IProps {
  rezervimet: IRezervimi[];
  librat: ILibri[];
  setEditMode: (editMode: boolean) => void;
  setCreateMode: (createMode: boolean) => void;
  selectRezervimi: (id: number) => void;
  deleteRezervimi: (id: number) => void;
}

const RezervimiTabela: React.FC<IProps> = ({
  rezervimet,
  librat,
  selectRezervimi,
  deleteRezervimi
}) => {
  const [first, setFirst] = useState<number>(0);
  const itemsPerPage = 15;

  const getLibriTitle = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn);
    return libri ? libri.titulli : "";
  };

  const getLibriKopertina = (libriIsbn: string): string => {
    const libri = librat.find((libri) => libri.isbn === libriIsbn);
    return libri ? libri.fotoja : "";
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const handleSave = async (rezervimi: IRezervimi) => {
    const currentDate = new Date();
    const dueDate = new Date(currentDate);
    dueDate.setDate(dueDate.getDate() + 15);

      const huazimiData = {
        currentDate: currentDate,
        dueDate: dueDate,
        isbn: rezervimi.isbn,
        id: rezervimi.id,
        username: rezervimi.username,
        hasRezervim: true
      };

      try {
        const response = await fetch("https://localhost:7226/api/Huazimi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(huazimiData),
        });

        if (response.ok) {
          // Delete the reservation after successfully saving huazimi data
          deleteRezervimi(rezervimi.rezervimiId);
          console.log("Reservation created and deleted");
        } else {
          console.log("Error creating reservation");
        }
      } catch (error) {
        console.log("Error creating reservation", error);
      }
  };

  // const handleSubmit = (rezervimi: IRezervimi) => {
  //   const huazimiInstance = createHuazimiInstance(rezervimi);
  //   createHuazimi(huazimiInstance);
  // };

  const renderTabelaRows = () => {
    const startIndex = first;
    const endIndex = first + itemsPerPage;

    return rezervimet.slice(startIndex, endIndex).map((rezervimi) => (
      <tr key={rezervimi.rezervimiId}>
        <td><img src={getLibriKopertina(rezervimi.isbn)} className="kopertina"></img></td>
        <td>{rezervimi.isbn}</td>
        <td>{getLibriTitle(rezervimi.isbn)}</td>
        <td>{rezervimi.username}</td>
        <td>{new Date(rezervimi.dueDate).toLocaleDateString()}</td>
        <td>
          <Button
            label="Edit"
            severity="secondary"
            text
            onClick={() => selectRezervimi(rezervimi.rezervimiId)}
          />
        </td>
        <td>
          <Button label="Huazo" text onClick={() => handleSave(rezervimi)}/>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="tabela">
        <Row className="align-items-center justify-content-between">
          <Col>
            <h3>Lista e rezervimeve</h3>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th scope="col">Huazimi</th>
              <th scope="col">ISBN</th>
              <th scope="col">Titulli</th>
              <th scope="col">Username</th>
              <th scope="col">DueDate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTabelaRows()}</tbody>
        </Table>
      </div>
      <Paginator
        className="paginator"
        first={first}
        rows={itemsPerPage}
        totalRecords={rezervimet.length}
        onPageChange={onPageChange}
        template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
      />
    </>
  );
};

export default RezervimiTabela;
