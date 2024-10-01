import { useEffect, useState } from "react";
import { IRezervimi } from "../../../app/layout/models/rezervimi";
import agent from "../../../app/layout/api/agent";
import RezervimiDashboard from "./RezervimiDashboard";
import { ILibriRequest } from "../../../app/layout/models/libriRequest";
import { ILibri } from "../../../app/layout/models/libri";
import { IHuazimi } from "../../../app/layout/models/huazimi";

const Rezervimet = () => {
  const [rezervimet, setRezervimet] = useState<IRezervimi[]>([]);

  const [librat, setLibrat] = useState<ILibri[]>([]);

  const [selectedRezervimi, setSelectedRezervimi] = useState<IRezervimi | null>(null);

  const [createMode, setCreateMode] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const handleEditRezervimi = (rezervimi: IRezervimi) => {
    agent.Rezervimet.update(rezervimi).then(() => {
      setRezervimet([...rezervimet.filter((r) => r.rezervimiId !== rezervimi.rezervimiId), rezervimi]);
      setSelectedRezervimi(rezervimi);
      setEditMode(false);
    });
  };

  const handleDeleteRezervimi = (id: number) => {
    agent.Rezervimet.delete(id).then(() => {
      setRezervimet([...rezervimet.filter((r) => r.rezervimiId !== id)]);
    });
  };

  const handleSelectRezervimi = (id: number) => {
    setSelectedRezervimi(rezervimet.filter((r) => r.rezervimiId === id)[0]);
    setEditMode(true);
  };

  useEffect(() => {
    agent.Rezervimet.list().then((response: IRezervimi[]) => {
      setRezervimet(response);
    });

    agent.Librat.list().then((libratResponse: ILibri[]) => {
      setLibrat(libratResponse);
    });
  }, []);

  return (
    <RezervimiDashboard
      rezervimet={rezervimet}
      librat={librat}
      selectRezervimi={handleSelectRezervimi}
      selectedRezervimi={selectedRezervimi!}
      editMode={editMode}
      setEditMode={setEditMode}
      setSelectedRezervimi={setSelectedRezervimi}
      editRezervimi={handleEditRezervimi}
      deleteRezervimi={handleDeleteRezervimi}
      createMode={createMode} 
      setCreateMode={setCreateMode}
      />
  );
};

export default Rezervimet;
