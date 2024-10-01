import { Col, Container, Row } from "react-bootstrap";
import LibriCard from "./LibriCard";
import { useEffect, useState } from "react";
import { ILibri } from "../../app/layout/models/libri";
import { IKategoria } from "../../app/layout/models/kategoria";
import { IAutori } from "../../app/layout/models/autori";
import agent from "../../app/layout/api/agent";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Panel } from "primereact/panel";
import { Checkbox } from "primereact/checkbox";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

const HomePage = () => {
  const [librat, setLibrat] = useState<ILibri[]>([]);
  const [kategorite, setKategorite] = useState<IKategoria[]>([]);
  const [selectedKategorite, setSelectedKategorite] = useState<IKategoria[]>([]);
  const [autoret, setAutoret] = useState<IAutori[]>([]);
  const [selectedAutoret, setSelectedAutoret] = useState<IAutori[]>([]);
  const [first, setFirst] = useState<number>(0);
  const [showMoreKategorite, setShowMoreKategorite] = useState<boolean>(false);
  const [showMoreAutoret, setShowMoreAutoret] = useState<boolean>(false);

  useEffect(() => {
    agent.Librat.list().then((response: ILibri[]) => {
      setLibrat(response);
    });

    agent.Kategorite.list().then((response: IKategoria[]) => {
      setKategorite(response);
    });

    agent.Autoret.list().then((response: IAutori[]) => {
      setAutoret(response);
    })

    window.scrollTo(0, 0);
  }, [first]);

  useEffect(() => {
    // Fetch books based on selected categories and authors
    const selectedKategoriaIds = selectedKategorite.map((kategoria) => kategoria.kategoriaId);
    const selectedAutoriIds = selectedAutoret.map((autori) => autori.autoriId);
  
    // Check if any checkboxes are selected
    const anyCheckboxSelected = selectedKategoriaIds.length > 0 || selectedAutoriIds.length > 0;
  
    if (anyCheckboxSelected) {
      // Perform filtering based on selected categories and authors
      const filteredLibratPromises: any[] = [];
  
      // Filter books based on selected categories
      selectedKategoriaIds.forEach((kategoriaId) => {
        const libratPromise = agent.Kategorite.getLibriNgaKategoria(kategoriaId);
        filteredLibratPromises.push(libratPromise);
      });
  
      // Filter books based on selected authors
      selectedAutoriIds.forEach((autoriId) => {
        const libratPromise = agent.Autoret.getLibriNgaAutori(autoriId);
        filteredLibratPromises.push(libratPromise);
      });
  
      // Combine all promises and update the state when all promises are resolved
      Promise.all(filteredLibratPromises)
      .then((filteredResponses) => {
        const uniqueLibrat = Array.from(new Set(filteredResponses.flat().map((libri) => libri.isbn)))
          .map((isbn) => filteredResponses.flat().find((libri) => libri.isbn === isbn));

        setLibrat(uniqueLibrat);
        });
    } else {
      // If no checkboxes are selected, fetch all books
      agent.Librat.list().then((response: ILibri[]) => {
        setLibrat(response);
      });
    }
  }, [selectedKategorite, selectedAutoret]);
  

  const renderKategoriteCheckboxes = (kategoriteList: IKategoria[]) => {
    const visibleItems = showMoreKategorite ? kategoriteList : kategoriteList.slice(0, 10);

    return visibleItems.map((kategoria: IKategoria) => (
      <div key={kategoria.kategoriaId} className="flex align-items-center">
          <Checkbox 
            inputId={kategoria.kategoriaId.toString()}
            name="kategoria" 
            value={kategoria} 
            onChange={(e) => onKategoriaChange(e, kategoria)} 
            checked={selectedKategorite.some((item) => item.kategoriaId === kategoria.kategoriaId)} 
            />
            <label htmlFor={kategoria.kategoriaId.toString()} className="ml-2"> {kategoria.emriKategorise}</label>
      </div>
    ));
  };

  const renderAutoretCheckboxes = (autoretList: IAutori[]) => {
    const visibleItems = showMoreAutoret ? autoretList : autoretList.slice(0, 10);

    return visibleItems.map((autori: IAutori) => (
      <div key={autori.autoriId} className="flex align-items-center">
          <Checkbox 
            inputId={autori.autoriId.toString()}
            name="autori" 
            value={autori} 
            onChange={(e) => onAutoriChange(e, autori)} 
            checked={selectedAutoret.some((item) => item.autoriId === autori.autoriId)} 
            />
            <label htmlFor={autori.autoriId.toString()} className="ml-2"> {autori.emri} {autori.mbiemri}</label>
      </div>
    ));
  };
  
  const onKategoriaChange = (event: any, kategoria: IKategoria) => {
    const updatedKategorite = event.checked
      ? [...selectedKategorite, kategoria]
      : selectedKategorite.filter((item) => item.kategoriaId !== kategoria.kategoriaId);
    setSelectedKategorite(updatedKategorite);
  };

  const onAutoriChange = (event: any, autori: IAutori) => {
    const updatedAutoret = event.checked
      ? [...selectedAutoret, autori]
      : selectedAutoret.filter((item) => item.autoriId !== autori.autoriId);
    setSelectedAutoret(updatedAutoret);
  };

 
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
};

const renderLibriCards = (librat: ILibri[]) => {
  const startIndex = first;
  const endIndex = first + 15; // Assuming 10 items per page, adjust this based on your `rows` value

  const rows = [];
  for (let i = startIndex; i < endIndex && i < librat.length; i += 3) {
    const row = (
      <Row key={i}>
        {librat.slice(i, i + 3).map((libri: ILibri) => (
          <Col md={4} key={libri.isbn}>
            <LibriCard librat={[libri]} />
          </Col>
        ))}
      </Row>
    );
    rows.push(row);
  }
  return rows;
};


  return (
    <Container style={{marginTop: "70px"}}>
    <Row>
      <Col style={{marginTop: "50px"}}>
      <Panel header="Kategoria" toggleable >
      {renderKategoriteCheckboxes(kategorite)}
            <div className="mt-2">
              <button className="btn-link" onClick={() => setShowMoreKategorite(!showMoreKategorite)}>
                {showMoreKategorite ? "Show Less" : "Show More"}
              </button>
            </div>
</Panel>
<Panel header="Autori" toggleable style={{marginTop: "20px"}}>
{renderAutoretCheckboxes(autoret)}
            <div className="mt-2">
              <button className="btn-link" onClick={() => setShowMoreAutoret(!showMoreAutoret)}>
                {showMoreAutoret ? "Show Less" : "Show More"}
              </button>
            </div>
</Panel>
</Col>
      <Col xs={9}>{renderLibriCards(librat)}</Col>
    </Row>
            <Paginator className="paginator" first={first} rows={15} totalRecords={librat.length} onPageChange={onPageChange} template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} />
    {/* <Container style={{marginTop: "70px"}}>
      {renderLibriCards(librat)} */}
    </Container>
  );
};

export default HomePage;