import { useCallback, useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;
export const useGetSkills = () => {
  const [skillCategories, setSkillGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = BASE_URL
        ? `${BASE_URL}/api/skill/getSkill`
        : "/api/skill/getSkills";
      const res = await fetch(apiUrl, { cache: "no-store" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `HTTP error ${res.status}`);
      }

      console.log("Fetched skills payload:", data);

      const list = Array.isArray(data)
        ? data
        : data.skills || data.skillCategories || data.data || [];

      setSkillGroups(list);
    } catch (err) {
      console.error("useGetSkills error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return { skillCategories, loading, error, refetch: fetchSkills };
};
