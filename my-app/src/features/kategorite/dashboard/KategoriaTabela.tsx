import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { Container, Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";

interface IProps {
  kategorite: IKategoria[];
  setEditKatMode: (editMode: boolean) => void;
  setCreateKatMode: (createMode: boolean) => void;
  selectKategoria: (kategoriaId: number) => void;
  deleteKategoria: (kategoriaId: number) => void;
}

const KategoriaTabela: React.FC<IProps> = ({
  kategorite,
  setCreateKatMode,
  selectKategoria,
  deleteKategoria,
}) => {
  const [first, setFirst] = useState<number>(0);
  
  const itemsPerPage = 15;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const renderTabelaRows = () => {
    const startIndex = first;
    const endIndex = first + itemsPerPage;

    return kategorite.slice(startIndex, endIndex).map((kategoria) => (
      <tr key={kategoria.kategoriaId}>
        <td>{kategoria.emriKategorise}</td>
        <td>
          <Button label="Edit" severity="secondary" text onClick={() => selectKategoria(kategoria.kategoriaId)} />
        </td>
        <td>
          <Button label="Delete" severity="danger" text onClick={() => deleteKategoria(kategoria.kategoriaId)} />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="tabela">
        <Row className="align-items-center justify-content-between">
          <Col>
            <h3>Lista e kategorive</h3>
          </Col>
          <Col xs="auto">
            <Button label="New" text onClick={() => setCreateKatMode(true)}></Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Emri</th>
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
        totalRecords={kategorite.length}
        onPageChange={onPageChange}
        template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
      />
    </>
  );
};

export default KategoriaTabela;
