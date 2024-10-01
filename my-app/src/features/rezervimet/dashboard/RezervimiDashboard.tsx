import { ILibri } from "../../../app/layout/models/libri";
import { IRezervimi } from "../../../app/layout/models/rezervimi";
import RezervimiTabela from "./RezervimiTabela";
// import KrijoRezervimin from "../form/KrijoRezervimin";
import EditoRezervimin from "../form/EditoRezervimin";
// import { ILibriRequest } from "../../../app/layout/models/LibriRequest";

interface IProps {
  rezervimet: IRezervimi[];
  librat: ILibri[];
  selectRezervimi: (id: number) => void;
  selectedRezervimi: IRezervimi;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedRezervimi: (rezervimi: IRezervimi | null) => void;
  editRezervimi: (rezervimi: IRezervimi) => void;
  deleteRezervimi: (id: number) => void;
  createMode: boolean;
  setCreateMode: (createMode: boolean) => void;
}

const RezervimiDashboard: React.FC<IProps> = ({
  rezervimet,
  librat,
  selectRezervimi,
  selectedRezervimi,
  editMode,
  setEditMode,
  editRezervimi,
  deleteRezervimi,
  setCreateMode,
}) => {
  return (
    <>
      <RezervimiTabela
        rezervimet={rezervimet}
        librat={librat}
        selectRezervimi={selectRezervimi}
        deleteRezervimi={deleteRezervimi}
        setEditMode={setEditMode}
        setCreateMode={setCreateMode}
      />
      {editMode && selectedRezervimi && (
        <EditoRezervimin
          show={true}
          onHide={() => setEditMode(false)}
          rezervimi={selectedRezervimi!}
          editRezervimi={editRezervimi}
        />
      )} 
    </>
  );
};

export default RezervimiDashboard;
