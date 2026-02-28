"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { InputGroup } from "@/components/ui/InputGroup";
import { EntryCard } from "@/components/resume/EntryCard";
import { Button } from "@/components/ui/Button";
import type { Course } from "@/types/resume";

interface CoursesSectionProps {
  items: Course[];
  onChange: (items: Course[]) => void;
}

type FormData = Omit<Course, "id">;

export function CoursesSection({ items, onChange }: CoursesSectionProps) {
  const [adding, setAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const handleAdd = (data: FormData) => {
    onChange([...items, { ...data, id: crypto.randomUUID() }]);
    reset();
    setAdding(false);
  };

  const handleDelete = (id: string) => onChange(items.filter((c) => c.id !== id));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button icon={Plus} variant="primary" onClick={() => setAdding(true)}>
          Add Course
        </Button>
      </div>

      {adding && (
        <div className="bg-bg border border-border-default rounded-[var(--radius-lg)] p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="font-body text-[15px] font-semibold text-text-primary">New Course</p>
            <button onClick={() => { setAdding(false); reset(); }} className="text-text-tertiary hover:text-text-primary cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup label="Course Name" placeholder="AWS Solutions Architect" registration={register("name", { required: "Required" })} error={errors.name?.message} />
              <InputGroup label="Provider" placeholder="Amazon" registration={register("provider", { required: "Required" })} error={errors.provider?.message} />
            </div>
            <InputGroup label="Completion Date" placeholder="2023" registration={register("date")} className="md:w-1/2" />
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" onClick={() => { setAdding(false); reset(); }}>Cancel</Button>
              <Button type="submit" variant="primary">Save</Button>
            </div>
          </form>
        </div>
      )}

      {items.map((c) => (
        <EntryCard
          key={c.id}
          title={c.name}
          subtitle={c.provider}
          meta={c.date}
          onDelete={() => handleDelete(c.id)}
        />
      ))}
    </div>
  );
}
