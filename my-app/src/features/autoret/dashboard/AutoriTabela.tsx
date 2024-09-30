import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IAutori } from "../../../app/layout/models/autori";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";

interface IProps {
  autoret: IAutori[];
  setEditAutMode: (editMode: boolean) => void;
  setCreateAutMode: (createMode: boolean) => void;
  selectAutori: (autoriId: number) => void;
  deleteAutori: (autoriId: number) => void;
}

const AutoriTabela: React.FC<IProps> = ({
  autoret,
  setCreateAutMode,
  selectAutori,
  deleteAutori,
}) => {
  const [first, setFirst] = useState<number>(0);

  const itemsPerPage = 15;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const renderTabelaRows = () => {
    const startIndex = first;
    const endIndex = first + itemsPerPage;

    return autoret.slice(startIndex, endIndex).map((autori) => (
      <tr key={autori.autoriId}>
        <td>{autori.emri}</td>
        <td>{autori.mbiemri}</td>
        <td>
          <Button label="Edit" severity="secondary" text onClick={() => selectAutori(autori.autoriId)} />
        </td>
        <td>
          <Button label="Delete" severity="danger" text onClick={() => deleteAutori(autori.autoriId)} />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="tabela">
        <Row className="align-items-center justify-content-between">
          <Col>
            <h3>Lista e autorëve</h3>
          </Col>
          <Col xs="auto">
            <Button label="New" text onClick={() => setCreateAutMode(true)} />
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Emri</th>
              <th scope="col">Mbiemri</th>
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
        totalRecords={autoret.length}
        onPageChange={onPageChange}
        template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
      />
    </>
  );
};

export default AutoriTabela;
