import React, { useCallback, useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;
const useGetProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/project/getProject`);
      const data = await res.json();
      if (data.error) throw new Error(data.error || "Failed to fetch projects");
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
  return { projects, loading };
};

export default useGetProjects;
