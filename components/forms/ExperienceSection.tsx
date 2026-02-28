"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { InputGroup } from "@/components/ui/InputGroup";
import { TextareaGroup } from "@/components/ui/TextareaGroup";
import { EntryCard } from "@/components/resume/EntryCard";
import { Button } from "@/components/ui/Button";
import type { Experience } from "@/types/resume";

interface ExperienceSectionProps {
  items: Experience[];
  onChange: (items: Experience[]) => void;
}

type FormData = Omit<Experience, "id">;

export function ExperienceSection({ items, onChange }: ExperienceSectionProps) {
  const [adding, setAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const handleAdd = (data: FormData) => {
    onChange([...items, { ...data, id: crypto.randomUUID() }]);
    reset();
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((e) => e.id !== id));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button icon={Plus} variant="primary" onClick={() => setAdding(true)}>
          Add Experience
        </Button>
      </div>

      {adding && (
        <div className="bg-bg border border-border-default rounded-[var(--radius-lg)] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-body text-[15px] font-semibold text-text-primary">New Experience</p>
            <button onClick={() => { setAdding(false); reset(); }} className="text-text-tertiary hover:text-text-primary cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Job Title" placeholder="Senior Software Engineer" registration={register("title", { required: "Required" })} error={errors.title?.message} />
              <InputGroup label="Company" placeholder="Google" registration={register("company", { required: "Required" })} error={errors.company?.message} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Start Date" placeholder="2022" registration={register("startDate")} />
              <InputGroup label="End Date" placeholder="Present" registration={register("endDate")} />
            </div>
            <TextareaGroup label="Description" placeholder="Describe your responsibilities and achievements..." registration={register("description")} />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={() => { setAdding(false); reset(); }}>Cancel</Button>
              <Button type="submit" variant="primary">Save</Button>
            </div>
          </form>
        </div>
      )}

      {items.map((exp) => (
        <EntryCard
          key={exp.id}
          title={exp.title}
          subtitle={exp.company}
          meta={`${exp.startDate} – ${exp.endDate}`}
          description={exp.description}
          onDelete={() => handleDelete(exp.id)}
        />
      ))}
    </div>
  );
}
