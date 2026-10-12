import { useState, useEffect, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const bufferToBase64 = (imageObj) => {
  if (!imageObj?.data?.data) return "";
  const bytes = new Uint8Array(imageObj.data.data);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${imageObj.contentType};base64,${btoa(binary)}`;
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/project/getProject`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch projects");
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (formDataPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/project/addProject`, {
        method: "POST",
        body: formDataPayload,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add project");
      setProjects((prev) => [...prev, data.newProject]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, formDataPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/project/updateProject/${id}`, {
        method: "PATCH",
        body: formDataPayload,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update project");
      setProjects((prev) =>
        prev.map((item) => (item._id === id ? data.updatedProject : item)),
      );
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const res = await fetch(`${BASE_URL}/api/project/deleteProject/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete project");
      setProjects((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  };
};
