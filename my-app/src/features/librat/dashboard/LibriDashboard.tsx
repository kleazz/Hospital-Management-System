import { ILibri } from "../../../app/layout/models/libri";
import LibriTabela from "./LibriTabela";
import KrijoLibrin from "../form/KrijoLibrin";
import EditoLibrin from "../form/EditoLibrin";
import { ILibriRequest } from "../../../app/layout/models/libriRequest";

interface IProps {
  librat: ILibri[];
  selectLibri: (isbn: string) => void;
  selectedLibri: ILibri;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedLibri: (libri: ILibri | null) => void;
  createLibri: (libri: ILibriRequest) => void;
  editLibri: (libri: ILibri) => void;
  deleteLibri: (isbn: string) => void;
  createMode: boolean;
  setCreateMode: (createMode: boolean) => void;
}

const LibriDashboard: React.FC<IProps> = ({
  librat,
  selectLibri,
  selectedLibri,
  editMode,
  setEditMode,
  createLibri,
  editLibri,
  deleteLibri,
  setCreateMode,
  createMode,
}) => {
  return (
    <>
      <LibriTabela
        librat={librat}
        selectLibri={selectLibri}
        deleteLibri={deleteLibri}
        setEditMode={setEditMode}
        setCreateMode={setCreateMode}
      />
      {createMode && (
        <KrijoLibrin
          show={true}
          onHide={() => setCreateMode(false)}
          key={(selectedLibri && selectedLibri.isbn) || 0}
          libri={selectedLibri!}
          createLibri={createLibri}           //editLibri={editLibri}
        />
      )}
      {editMode && selectedLibri && (
        <EditoLibrin
          show={true}
          onHide={() => setEditMode(false)}
          libri={selectedLibri!}
          editLibri={editLibri}
        />
      )}
    </>
  );
};

export default LibriDashboard;
