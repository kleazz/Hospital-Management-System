import { useEffect, useState } from "react";
import { IRezervimi } from "../../../app/layout/models/rezervimi";
import agent from "../../../app/layout/api/agent";
import HuazimiDashboard from "./HuazimiDashboard";
import { ILibriRequest } from "../../../app/layout/models/libriRequest";
import { ILibri } from "../../../app/layout/models/libri";
import { IHuazimi } from "../../../app/layout/models/huazimi";

const Huazimet = () => {
  const [huazimet, setHuazimet] = useState<IHuazimi[]>([]);

  const [librat, setLibrat] = useState<ILibri[]>([]);

  const [selectedHuazimi, setSelectedHuazimi] = useState<IHuazimi | null>(null);

  const [createMode, setCreateMode] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const handleCreateHuazimi = (huazimi: IHuazimi) => {
    agent.Huazimet.create(huazimi).then((response) => {
      setHuazimet([...huazimet, response]);
      setSelectedHuazimi(response);
      setEditMode(false);
    });
  };

  const handleEditHuazimi = (huazimi: IHuazimi) => {
    agent.Huazimet.update(huazimi).then(() => {
      setHuazimet([...huazimet.filter((h) => h.huazimiId !== huazimi.huazimiId), huazimi]);
      setSelectedHuazimi(huazimi);
      setEditMode(false);
    });
  };

  const handleDeleteHuazimi = (id: number) => {
    agent.Huazimet.delete(id).then(() => {
      setHuazimet([...huazimet.filter((h) => h.huazimiId!== id)]);
    });
  };

  const handleSelectHuazimi = (id: number) => {
    setSelectedHuazimi(huazimet.filter((h) => h.huazimiId === id)[0]);
    setEditMode(true);
  };

  useEffect(() => {
    agent.Huazimet.list().then((response: IHuazimi[]) => {
      setHuazimet(response);
    });

    agent.Librat.list().then((libratResponse: ILibri[]) => {
      setLibrat(libratResponse);
    });
  }, []);

  return (
    <HuazimiDashboard
      huazimet={huazimet}
      librat={librat}
      selectHuazimi={handleSelectHuazimi}
      selectedHuazimi={selectedHuazimi!}
      editMode={editMode}
      setEditMode={setEditMode}
      setSelectedHuazimi={setSelectedHuazimi}
      editHuazimi={handleEditHuazimi}
      deleteHuazimi={handleDeleteHuazimi}
      createMode={createMode}
      setCreateMode={setCreateMode} 
      createHuazimi={handleCreateHuazimi}
             />
  );
};

export default Huazimet;
