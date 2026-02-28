"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { InputGroup } from "@/components/ui/InputGroup";
import { EntryCard } from "@/components/resume/EntryCard";
import { Button } from "@/components/ui/Button";
import type { Education } from "@/types/resume";

interface EducationSectionProps {
  items: Education[];
  onChange: (items: Education[]) => void;
}

type FormData = Omit<Education, "id">;

export function EducationSection({ items, onChange }: EducationSectionProps) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const handleAdd = (data: FormData) => {
    const newItem: Education = { ...data, id: crypto.randomUUID() };
    onChange([...items, newItem]);
    reset();
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((e) => e.id !== id));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button icon={Plus} variant="primary" onClick={() => { setAdding(true); setEditing(null); }}>
          Add Education
        </Button>
      </div>

      {(adding || editing) && (
        <div className="bg-bg border border-border-default rounded-[var(--radius-lg)] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-body text-[15px] font-semibold text-text-primary">New Education</p>
            <button onClick={() => { setAdding(false); setEditing(null); reset(); }} className="text-text-tertiary hover:text-text-primary cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Institution" placeholder="MIT" registration={register("institution", { required: "Required" })} error={errors.institution?.message} />
              <InputGroup label="Degree" placeholder="B.Sc." registration={register("degree", { required: "Required" })} error={errors.degree?.message} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputGroup label="Field of Study" placeholder="Computer Science" registration={register("field")} />
              <InputGroup label="Start Year" placeholder="2016" registration={register("startDate")} />
              <InputGroup label="End Year" placeholder="2020" registration={register("endDate")} />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={() => { setAdding(false); reset(); }}>Cancel</Button>
              <Button type="submit" variant="primary">Save</Button>
            </div>
          </form>
        </div>
      )}

      {items.map((edu) => (
        <EntryCard
          key={edu.id}
          title={`${edu.degree} in ${edu.field}`}
          subtitle={edu.institution}
          meta={`${edu.startDate} – ${edu.endDate}`}
          onDelete={() => handleDelete(edu.id)}
        />
      ))}
    </div>
  );
}
