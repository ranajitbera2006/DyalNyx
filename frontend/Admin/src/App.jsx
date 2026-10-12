import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { ProjectList } from "./components/ProjectList";
import { ProjectForm } from "./components/ProjectForm";
import { SkillsManager } from "./components/SkillsManager";
import { useProjects } from "./hooks/useProjects";

function App() {
  const [activeTab, setActiveTab] = useState("projects");
  const [editingProject, setEditingProject] = useState(null);

  const { projects, loading, addProject, updateProject, deleteProject } =
    useProjects();

  const handleFormSubmit = async (formData, id) => {
    let result;
    if (id) {
      result = await updateProject(id, formData);
    } else {
      result = await addProject(formData);
    }

    if (result.success) {
      setEditingProject(null);
      setActiveTab("projects");
    } else {
      alert(`Operation failed: ${result.error}`);
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setActiveTab("addProject");
  };

  return (
    <div className="min-h-screen bg-[#0c1015] text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === "addProject") setEditingProject(null);
          setActiveTab(tab);
        }}
      />

      <main className="py-6">
        {activeTab === "projects" && (
          <ProjectList
            projects={projects}
            loading={loading}
            onDelete={deleteProject}
            onEdit={handleEditClick}
          />
        )}

        {activeTab === "addProject" && (
          <ProjectForm
            editData={editingProject}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setEditingProject(null);
              setActiveTab("projects");
            }}
          />
        )}

        {activeTab === "skills" && <SkillsManager />}
      </main>
    </div>
  );
}

export default App;
