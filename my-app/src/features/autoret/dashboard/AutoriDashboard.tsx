import { IAutori } from "../../../app/layout/models/autori";
import EditoAutorin from "../form/EditoAutorin";
import KrijoAutorin from "../form/KrijoAutorin";
import AutoriTabela from "./AutoriTabela";

interface IProps {
  autoret: IAutori[];
  selectAutori: (autoriId: number) => void;
  selectedAutori: IAutori;
  editAutMode: boolean;
  setEditAutMode: (editMode: boolean) => void;
  setSelectedAutori: (autori: IAutori | null) => void;
  createAutori: (autori: IAutori) => void;
  editAutori: (autori: IAutori) => void;
  deleteAutori: (autoriId: number) => void;
  createAutMode: boolean;
  setCreateAutMode: (createAutMode: boolean) => void;
}

const AutoriDashboard: React.FC<IProps> = ({
  autoret,
  selectAutori,
  selectedAutori,
  editAutMode,
  setEditAutMode,
  createAutori,
  editAutori,
  deleteAutori,
  setCreateAutMode,
  createAutMode,
}) => {
  return (
    <>
      <AutoriTabela
        autoret={autoret}
        selectAutori={selectAutori}
        deleteAutori={deleteAutori}
        setEditAutMode={setEditAutMode}
        setCreateAutMode={setCreateAutMode}
      />
      {createAutMode && (
        <KrijoAutorin
          show={true}
          onHide={() => setCreateAutMode(false)}
          key={
            (selectedAutori &&
              `${selectedAutori.emri}_${selectedAutori.mbiemri}`) ||
            0
          }
          autori={selectedAutori!}
          createAutori={createAutori}
          editAutori={editAutori}
        />
      )}
      {editAutMode && selectedAutori && (
        <EditoAutorin
          show={true}
          onHide={() => setEditAutMode(false)}
          autori={selectedAutori!}
          editAutori={editAutori}
        />
      )}
    </>
  );
};

export default AutoriDashboard;
