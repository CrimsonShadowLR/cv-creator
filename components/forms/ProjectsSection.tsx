"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { InputGroup } from "@/components/ui/InputGroup";
import { TextareaGroup } from "@/components/ui/TextareaGroup";
import { EntryCard } from "@/components/resume/EntryCard";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types/resume";

interface ProjectsSectionProps {
  items: Project[];
  onChange: (items: Project[]) => void;
}

type FormData = Omit<Project, "id">;

export function ProjectsSection({ items, onChange }: ProjectsSectionProps) {
  const [adding, setAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const handleAdd = (data: FormData) => {
    onChange([...items, { ...data, id: crypto.randomUUID() }]);
    reset();
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((p) => p.id !== id));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button icon={Plus} variant="primary" onClick={() => setAdding(true)}>
          Add Project
        </Button>
      </div>

      {adding && (
        <div className="bg-bg border border-border-default rounded-[var(--radius-lg)] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-body text-[15px] font-semibold text-text-primary">New Project</p>
            <button onClick={() => { setAdding(false); reset(); }} className="text-text-tertiary hover:text-text-primary cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Project Name" placeholder="ResumeForge" registration={register("name", { required: "Required" })} error={errors.name?.message} />
              <InputGroup label="URL" placeholder="https://resumeforge.io" registration={register("url")} />
            </div>
            <TextareaGroup label="Description" placeholder="Describe what the project does and the tech stack used..." registration={register("description")} />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={() => { setAdding(false); reset(); }}>Cancel</Button>
              <Button type="submit" variant="primary">Save</Button>
            </div>
          </form>
        </div>
      )}

      {items.map((p) => (
        <EntryCard
          key={p.id}
          title={p.name}
          subtitle={p.url}
          description={p.description}
          onDelete={() => handleDelete(p.id)}
        />
      ))}
    </div>
  );
}
