"use client";

import { useForm } from "react-hook-form";
import { InputGroup } from "@/components/ui/InputGroup";
import { TextareaGroup } from "@/components/ui/TextareaGroup";
import type { PersonalInfo } from "@/types/resume";

interface PersonalInfoFormProps {
  defaultValues?: Partial<PersonalInfo>;
  onSubmit: (data: PersonalInfo) => void;
  formId?: string;
}

export function PersonalInfoForm({ defaultValues, onSubmit, formId = "personal-info-form" }: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfo>({ defaultValues });

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup
          label="First Name"
          placeholder="Alex"
          registration={register("firstName", { required: "First name is required" })}
          error={errors.firstName?.message}
        />
        <InputGroup
          label="Last Name"
          placeholder="Johnson"
          registration={register("lastName", { required: "Last name is required" })}
          error={errors.lastName?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup
          label="Email"
          type="email"
          placeholder="alex@example.com"
          registration={register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
          })}
          error={errors.email?.message}
        />
        <InputGroup
          label="Phone"
          placeholder="+1 (555) 123-4567"
          registration={register("phone")}
          error={errors.phone?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup
          label="City"
          placeholder="San Francisco"
          registration={register("city")}
          error={errors.city?.message}
        />
        <InputGroup
          label="Country"
          placeholder="United States"
          registration={register("country")}
          error={errors.country?.message}
        />
      </div>
      <TextareaGroup
        label="Professional Summary"
        placeholder="Write a brief summary about yourself, your skills, and career goals..."
        registration={register("summary")}
        error={errors.summary?.message}
        rows={5}
      />
    </form>
  );
}
