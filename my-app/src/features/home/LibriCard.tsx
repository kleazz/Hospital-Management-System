import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import { ILibri } from "../../app/layout/models/libri";
import { Link } from "react-router-dom";
import { IKategoria } from "../../app/layout/models/kategoria";
import { IAutori } from "../../app/layout/models/autori";
import agent from "../../app/layout/api/agent";

interface IProps {
  librat: ILibri[];
}

const LibriCard: React.FC<IProps> = ({ librat }) => {
  const [autoret, setAutoret] = useState<string | null>(null);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const getAutoretForLibri = async (isbn: string): Promise<void> => {
    const autoretForLibri = await agent.Librat.getAutoriNgaLibri(isbn);
    const autoretString = autoretForLibri.map((autori) => `${autori.emri} ${autori.mbiemri}`).join(" & ");
    setAutoret(autoretString);
  };

  useEffect(() => {
    // Fetch autoret when librat changes
    librat.forEach((libri) => {
      getAutoretForLibri(libri.isbn);
    });
  }, [librat]);

  return (
    <>
      {librat.map((libri: ILibri) => (
        <div key={libri.isbn} className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Card
                style={{
                  width: "16rem",
                  height: "26rem",
                  padding: "20px",
                  position: "relative",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Card.Img
                  variant="top"
                  src={libri.fotoja}
                  style={{ paddingTop: "5px", height: "300px", width: "200px" }}
                  className="mx-auto"
                  loading="lazy"
                />
                <Card.Body>
                  <Card.Title style={{ fontWeight: "bold" }} >
                  {truncateText(libri.titulli, 15)}
                  </Card.Title>
                  <Card.Title style={{ color: "#8b9496" }}>{autoret}</Card.Title>
                </Card.Body>
              </Card>
            </div>
            <div className="flip-card-back">
              <Card
                style={{ width: "17rem", height: "26rem", padding: "20px", backgroundColor: "#1c2c3c", color: "white" }}
              >
                <Card.Text>{truncateText(libri.pershkrimi, 400)}</Card.Text>
                <div className="button-container">
                  <Link to={`/details/${libri.isbn}`} id="card-link">
                    Shiko më shumë &gt;
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LibriCard;
