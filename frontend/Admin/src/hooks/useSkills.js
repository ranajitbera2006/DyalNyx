import { useState, useEffect, useCallback } from "react";

const SKILL_URL =
  import.meta.env.VITE_API_URL;

export const useSkills = () => {
  const [skillGroups, setSkillGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${SKILL_URL}/api/skill/getSkill`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load skills");
      setSkillGroups(Array.isArray(data) ? data : data.skills || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const addSkillGroup = async (payload) => {
    try {
      const res = await fetch(`${SKILL_URL}/api/skill/addSkill`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to create skill group");
      setSkillGroups((prev) => [data.newSkill, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateSkillGroup = async (id, payload) => {
    try {
      const res = await fetch(`${SKILL_URL}/api/skill/updateSkill/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to update skill group");
      setSkillGroups((prev) =>
        prev.map((item) => (item._id === id ? data.updatedSkill : item)),
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteSkillGroup = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill category?"))
      return;
    try {
      const res = await fetch(`${SKILL_URL}/api/skill/deleteSkill/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to delete skill category");
      setSkillGroups((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return {
    skillGroups,
    loading,
    error,
    fetchSkills,
    addSkillGroup,
    updateSkillGroup,
    deleteSkillGroup,
  };
};
