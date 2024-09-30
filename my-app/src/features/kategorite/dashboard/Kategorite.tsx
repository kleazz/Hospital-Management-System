import { useEffect, useState } from "react";
import { IKategoria } from "../../../app/layout/models/kategoria";
import agent from "../../../app/layout/api/agent";
import KategoriaDashboard from "./KategoriaDashboard";

const Kategorite = () => {
  const [kategorite, setKategorite] = useState<IKategoria[]>([]);

  const [selectedKategoria, setSelectedKategoria] = useState<IKategoria | null>(
    null
  );

  const [createKatMode, setCreateKatMode] = useState(false);

  const [editKatMode, setEditKatMode] = useState(false);

  const handleCreateKategoria = (kategoria: IKategoria) => {
    agent.Kategorite.create(kategoria).then((response) => {
      setKategorite([...kategorite, response]);
      setSelectedKategoria(response);
      setEditKatMode(false);
    });
  };

  const handleEditKategoria = (kategoria: IKategoria) => {
    agent.Kategorite.update(kategoria).then(() => {
      setKategorite([
        ...kategorite.filter((k) => k.kategoriaId !== kategoria.kategoriaId),
        kategoria,
      ]);
      setSelectedKategoria(kategoria);
      setEditKatMode(false);
    });
  };

  const handleDeleteKategoria = (kategoriaId: number) => {
    agent.Kategorite.delete(kategoriaId).then(() => {
      setKategorite([
        ...kategorite.filter((k) => k.kategoriaId !== kategoriaId),
      ]);
    });
  };

  const handleSelectKategoria = (kategoriaId: number) => {
    setSelectedKategoria(
      kategorite.filter((k) => k.kategoriaId === kategoriaId)[0]
    );
    setEditKatMode(true);
  };

  useEffect(() => {
    agent.Kategorite.list().then((response: IKategoria[]) => {
      setKategorite(response);
    });
  }, []);

  return (
    <KategoriaDashboard
      kategorite={kategorite}
      selectKategoria={handleSelectKategoria}
      selectedKategoria={selectedKategoria!}
      editKatMode={editKatMode}
      setEditKatMode={setEditKatMode}
      setSelectedKategoria={setSelectedKategoria}
      createKategoria={handleCreateKategoria}
      editKategoria={handleEditKategoria}
      deleteKategoria={handleDeleteKategoria}
      createKatMode={createKatMode}
      setCreateKatMode={setCreateKatMode}
    />
  );
};

export default Kategorite;
