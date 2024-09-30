import React, { useEffect, useState } from "react";
import { IRezervimi } from "../../app/layout/models/rezervimi";
import { Avatar } from "primereact/avatar";
import { Fieldset } from "primereact/fieldset";
import { TabPanel, TabView } from "primereact/tabview";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ILibri } from "../../app/layout/models/libri";
import agent from "../../app/layout/api/agent";
import ProfiliDashboard from "./ProfiliDashboard";
import { IHuazimi } from "../../app/layout/models/huazimi";

const Profili = () => {
  const [rezervimet, setRezervimet] = useState <IRezervimi[]>([]);

  const [huazimet, setHuazimet] = useState<IHuazimi[]>([]);

  const[librat, setLibrat] = useState <ILibri[]>([]);

  const handleDeleteRezervimi = (id: number) => {
    agent.Rezervimet.delete(id).then(() => {
      setRezervimet([...rezervimet.filter((r) => r.rezervimiId !== id)]);
    });
  };

  useEffect(() => {
    agent.Rezervimet.list().then((response: IRezervimi[]) => {
      setRezervimet(response);
    });

    agent.Librat.list().then((response: ILibri[]) => {
      setLibrat(response);

    agent.Huazimet.list().then((response: IHuazimi[]) => {
      setHuazimet(response);
    })
    });
  }, []);

  return(
    <ProfiliDashboard
    rezervimet={rezervimet}
    huazimet={huazimet}
    librat={librat}
    deleteRezervimi={handleDeleteRezervimi}/>
  );
};

export default Profili;




