import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../../../app/layout/api/agent";
import LibriDashboard from "./LibriDashboard";
import { ILibri } from "../../../app/layout/models/libri";
import { ILibriRequest } from "../../../app/layout/models/libriRequest";

const Librat = () => {
  const queryClient = useQueryClient();

  // Fetch books with useQuery
  const { data: librat = [], isLoading, isError } = useQuery<ILibri[]>({
    queryKey: ["librat"], // Ensure this is a valid key
    queryFn: agent.Librat.list,
  });

  // Create new book with useMutation
  const createLibriMutation = useMutation({
    mutationFn: agent.Librat.create,
    onSuccess: () => {
      // Invalidate the query to refresh the list after creation
      queryClient.invalidateQueries({ queryKey: ["librat"] });
    },
  });

  // Update a book with useMutation
  const updateLibriMutation = useMutation({
    mutationFn: agent.Librat.update,
    onSuccess: () => {
      // Invalidate the query to refresh the list after updating
      queryClient.invalidateQueries({ queryKey: ["librat"] });
    },
  });

  // Delete a book with useMutation
  const deleteLibriMutation = useMutation({
    mutationFn: agent.Librat.delete,
    onSuccess: () => {
      // Invalidate the query to refresh the list after deletion
      queryClient.invalidateQueries({ queryKey: ["librat"] });
    },
  });

  const handleCreateLibri = (libri: ILibriRequest) => {
    createLibriMutation.mutate(libri);
  };

  const handleEditLibri = (libri: ILibri) => {
    updateLibriMutation.mutate(libri);
  };

  const handleDeleteLibri = (isbn: string) => {
    deleteLibriMutation.mutate(isbn);
  };

  const [selectedLibri, setSelectedLibri] = useState<ILibri | null>(null);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleSelectLibri = (isbn: string) => {
    const selected = librat.find((l) => l.isbn === isbn);
    setSelectedLibri(selected || null);
    setEditMode(true);
  };

  return (
    <div className="main-content">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}
      {!isLoading && !isError && (
        <LibriDashboard
          librat={librat}
          selectLibri={handleSelectLibri}
          selectedLibri={selectedLibri!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedLibri={setSelectedLibri}
          createLibri={handleCreateLibri}
          editLibri={handleEditLibri}
          deleteLibri={handleDeleteLibri}
          createMode={createMode}
          setCreateMode={setCreateMode}
        />
      )}
    </div>
  );
};

export default Librat;
