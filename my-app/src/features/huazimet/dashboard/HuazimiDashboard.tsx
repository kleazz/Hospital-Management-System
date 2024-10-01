import { ILibri } from "../../../app/layout/models/libri";
import { IHuazimi } from "../../../app/layout/models/huazimi";
import HuazimiTabela from "./HuazimiTabela";
// import KrijoRezervimin from "../form/KrijoRezervimin";
import EditoHuazimin from "../form/EditoHuazimin";
import KrijoHuazimin from "../form/KrijoHuazimin";
// import { ILibriRequest } from "../../../app/layout/models/LibriRequest";

interface IProps {
  huazimet: IHuazimi[];
  librat: ILibri[];
  selectHuazimi: (id: number) => void;
  selectedHuazimi: IHuazimi;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedHuazimi: (huazimi: IHuazimi | null) => void;
  createHuazimi: (huazimi:IHuazimi) => void;
  editHuazimi: (huazimi: IHuazimi) => void;
  deleteHuazimi: (id: number) => void;
  createMode: boolean;
  setCreateMode: (createMode: boolean) => void;
}

const HuazimiDashboard: React.FC<IProps> = ({
  huazimet,
  librat,
  selectHuazimi,
  selectedHuazimi,
  editMode,
  createMode,
  setEditMode,
  editHuazimi,
  deleteHuazimi,
  setCreateMode,
  createHuazimi,
}) => {
  return (
    <>
      <HuazimiTabela
        huazimet={huazimet}
        librat={librat}
        selectHuazimi={selectHuazimi}
        deleteHuazimi={deleteHuazimi}
        setEditMode={setEditMode}
        setCreateMode={setCreateMode} huazimi={selectedHuazimi} 
      />
      {createMode && (
        <KrijoHuazimin
        show={true}
        onHide={() => setCreateMode(false)}
      key={(selectedHuazimi && selectedHuazimi.huazimiId) || 0}
      huazimi={selectedHuazimi!}
    createHuazimi={createHuazimi}/>
      )}
      {editMode && selectedHuazimi && (
        <EditoHuazimin
          show={true}
          onHide={() => setEditMode(false)}
          huazimi={selectedHuazimi!}
          editHuazimi={editHuazimi}
        />
      )} 
    </>
  );
};

export default HuazimiDashboard;
