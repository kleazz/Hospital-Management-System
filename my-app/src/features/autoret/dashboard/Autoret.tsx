import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../../../app/layout/api/agent";
import { IAutori } from "../../../app/layout/models/autori";
import AutoriDashboard from "./AutoriDashboard";

const Autoret = () => {
  const queryClient = useQueryClient();

  // Fetch authors with useQuery
  const { data: autoret = [], isLoading, isError } = useQuery<IAutori[]>({
    queryKey: ["autoret"], // Ensure this is a valid key
    queryFn: agent.Autoret.list,
  });

  // Create new author with useMutation
  const createAutoriMutation = useMutation({
    mutationFn: agent.Autoret.create,
    onSuccess: () => {
      // Invalidate the query to refresh the list after creation
      queryClient.invalidateQueries({ queryKey: ["autoret"] });
    },
  });

  // Update an author with useMutation
  const updateAutoriMutation = useMutation({
    mutationFn: agent.Autoret.update,
    onSuccess: () => {
      // Invalidate the query to refresh the list after updating
      queryClient.invalidateQueries({ queryKey: ["autoret"] });
    },
  });

  // Delete an author with useMutation
  const deleteAutoriMutation = useMutation({
    mutationFn: agent.Autoret.delete,
    onSuccess: () => {
      // Invalidate the query to refresh the list after deletion
      queryClient.invalidateQueries({ queryKey: ["autoret"] });
    },
  });

  const handleCreateAutori = (autori: IAutori) => {
    createAutoriMutation.mutate(autori);
  };

  const handleEditAutori = (autori: IAutori) => {
    updateAutoriMutation.mutate(autori);
  };

  const handleDeleteAutori = (autoriId: number) => {
    deleteAutoriMutation.mutate(autoriId);
  };

  const [selectedAutori, setSelectedAutori] = useState<IAutori | null>(null);
  const [createAutMode, setCreateAutMode] = useState(false);
  const [editAutMode, setEditAutMode] = useState(false);

  const handleSelectAutori = (autoriId: number) => {
    const selected = autoret.find((a) => a.autoriId === autoriId);
    setSelectedAutori(selected || null);
    setEditAutMode(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <AutoriDashboard
      autoret={autoret}
      selectAutori={handleSelectAutori}
      selectedAutori={selectedAutori!}
      editAutMode={editAutMode}
      setEditAutMode={setEditAutMode}
      setSelectedAutori={setSelectedAutori}
      createAutori={handleCreateAutori}
      editAutori={handleEditAutori}
      deleteAutori={handleDeleteAutori}
      createAutMode={createAutMode}
      setCreateAutMode={setCreateAutMode}
    />
  );
};

export default Autoret;
