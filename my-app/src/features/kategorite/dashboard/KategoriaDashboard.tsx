import { IKategoria } from "../../../app/layout/models/kategoria";
import EditoKategorine from "../form/EditoKategorine";
import KrijoKategorine from "../form/KrijoKategorine";
import KategoriaTabela from "./KategoriaTabela";

interface IProps {
  kategorite: IKategoria[];
  selectKategoria: (kategoriaId: number) => void;
  selectedKategoria: IKategoria;
  editKatMode: boolean;
  setEditKatMode: (editMode: boolean) => void;
  setSelectedKategoria: (kategoria: IKategoria | null) => void;
  createKategoria: (kategoria: IKategoria) => void;
  editKategoria: (kategoria: IKategoria) => void;
  deleteKategoria: (kategoriaId: number) => void;
  createKatMode: boolean;
  setCreateKatMode: (createKatMode: boolean) => void;
}

const KategoriaDashboard: React.FC<IProps> = ({
  kategorite,
  selectKategoria,
  selectedKategoria,
  editKatMode,
  setEditKatMode,
  createKategoria,
  editKategoria,
  deleteKategoria,
  setCreateKatMode,
  createKatMode,
}) => {
  return (
    <>
      <KategoriaTabela
        kategorite={kategorite}
        selectKategoria={selectKategoria}
        deleteKategoria={deleteKategoria}
        setEditKatMode={setEditKatMode}
        setCreateKatMode={setCreateKatMode}
      />
      {createKatMode && (
        <KrijoKategorine
          show={true}
          onHide={() => setCreateKatMode(false)}
          key={(selectedKategoria && selectedKategoria.emriKategorise) || 0}
          kategoria={selectedKategoria!}
          createKategoria={createKategoria}
          editKategoria={editKategoria}
        />
      )}
      {editKatMode && selectedKategoria && (
        <EditoKategorine
          show={true}
          onHide={() => setEditKatMode(false)}
          kategoria={selectedKategoria!}
          editKategoria={editKategoria}
        />
      )}
    </>
  );
};

export default KategoriaDashboard;
