import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { ILexuesi } from "../../../app/layout/models/lexuesi";
import agent from "../../../app/layout/api/agent";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";

const Lexuesit: React.FC = () => {
  const [lexuesit, setLexuesit] = useState<ILexuesi[]>([]);
  const [first, setFirst] = useState<number>(0);

  useEffect(() => {
    agent.Lexuesit.list().then((response: ILexuesi[]) => {
      setLexuesit(response);
    });
  }, []);

  const handleDeleteLexuesi = (username: string) => {
    agent.Lexuesit.delete(username).then(() => {
      setLexuesit([...lexuesit.filter((l) => l.username !== username)]);
    });
  };

  const itemsPerPage = 15;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const renderTabelaRows = () => {
    const startIndex = first;
    const endIndex = first + itemsPerPage;

    return lexuesit.slice(startIndex, endIndex).map((lexuesi) => (
      <tr key={lexuesi.username}>
        <td>{lexuesi.username}</td>
        <td>{lexuesi.email}</td>
        <td>
          <Button label="Delete" severity="danger" text onClick={() => handleDeleteLexuesi(lexuesi.username)} />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="tabela">
        <Row className="align-items-center justify-content-between">
          <Col>
            <h3>Lista e lexuesve</h3>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">username</th>
              <th scope="col">email</th>
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
        totalRecords={lexuesit.length}
        onPageChange={onPageChange}
        template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
      />
    </>
  );
};

export default Lexuesit;
