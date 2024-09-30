import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { ILibri } from "../../../app/layout/models/libri";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";

interface IProps {
  librat: ILibri[];
  setEditMode: (editMode: boolean) => void;
  setCreateMode: (createMode: boolean) => void;
  selectLibri: (isbn: string) => void;
  deleteLibri: (isbn: string) => void;
}

const LibriTabela: React.FC<IProps> = ({
  librat,
  setCreateMode,
  selectLibri,
  deleteLibri,
}) => {
  const [first, setFirst] = useState<number>(0);

  const itemsPerPage = 15; // Set the number of items per page

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const renderTabelaRows = () => {
    const startIndex = first;
    const endIndex = first + itemsPerPage;

    return librat.slice(startIndex, endIndex).map((libri) => (
      <tr key={libri.isbn}>
        <td>{libri.isbn}</td>
        <td>{libri.titulli}</td>
        <td>{truncateText(libri.pershkrimi, 50)}</td>
        <td><img src={libri.fotoja} className="kopertina"></img></td>
        <td>{libri.sasia}</td>
        <td>
          <Button label="Edit" severity="secondary" text onClick={() => selectLibri(libri.isbn)} />
        </td>
        <td>
          <Button label="Delete" severity="danger" text onClick={() => deleteLibri(libri.isbn)} />
        </td>
      </tr>
    ));
  };

  return (
    <>
    <div className="tabela">
      <Row className="align-items-center justify-content-between">
        <Col>
          <h3>Lista e librave</h3>
        </Col>
        <Col xs="auto">
          <Button label="New" text onClick={() => setCreateMode(true)}></Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">ISBN</th>
            <th scope="col">Titulli</th>
            <th scope="col">Përshkrimi</th>
            <th scope="col">Kopertina</th>
            <th scope="col">Sasia</th>
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
     totalRecords={librat.length}
     onPageChange={onPageChange}
     template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
   />
   </>
  );
};

export default LibriTabela;
