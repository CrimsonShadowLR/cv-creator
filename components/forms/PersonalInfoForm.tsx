"use client";

import { useForm } from "react-hook-form";
import { InputGroup } from "@/components/ui/InputGroup";
import { TextareaGroup } from "@/components/ui/TextareaGroup";
import type { PersonalInfo } from "@/types/resume";

const COUNTRY_CODES = [
  { code: "+1",   flag: "🇺🇸", label: "US / Canada" },
  { code: "+7",   flag: "🇷🇺", label: "Russia" },
  { code: "+20",  flag: "🇪🇬", label: "Egypt" },
  { code: "+27",  flag: "🇿🇦", label: "South Africa" },
  { code: "+30",  flag: "🇬🇷", label: "Greece" },
  { code: "+31",  flag: "🇳🇱", label: "Netherlands" },
  { code: "+32",  flag: "🇧🇪", label: "Belgium" },
  { code: "+33",  flag: "🇫🇷", label: "France" },
  { code: "+34",  flag: "🇪🇸", label: "Spain" },
  { code: "+36",  flag: "🇭🇺", label: "Hungary" },
  { code: "+39",  flag: "🇮🇹", label: "Italy" },
  { code: "+40",  flag: "🇷🇴", label: "Romania" },
  { code: "+41",  flag: "🇨🇭", label: "Switzerland" },
  { code: "+43",  flag: "🇦🇹", label: "Austria" },
  { code: "+44",  flag: "🇬🇧", label: "United Kingdom" },
  { code: "+45",  flag: "🇩🇰", label: "Denmark" },
  { code: "+46",  flag: "🇸🇪", label: "Sweden" },
  { code: "+47",  flag: "🇳🇴", label: "Norway" },
  { code: "+48",  flag: "🇵🇱", label: "Poland" },
  { code: "+49",  flag: "🇩🇪", label: "Germany" },
  { code: "+51",  flag: "🇵🇪", label: "Peru" },
  { code: "+52",  flag: "🇲🇽", label: "Mexico" },
  { code: "+54",  flag: "🇦🇷", label: "Argentina" },
  { code: "+55",  flag: "🇧🇷", label: "Brazil" },
  { code: "+56",  flag: "🇨🇱", label: "Chile" },
  { code: "+57",  flag: "🇨🇴", label: "Colombia" },
  { code: "+58",  flag: "🇻🇪", label: "Venezuela" },
  { code: "+60",  flag: "🇲🇾", label: "Malaysia" },
  { code: "+61",  flag: "🇦🇺", label: "Australia" },
  { code: "+62",  flag: "🇮🇩", label: "Indonesia" },
  { code: "+63",  flag: "🇵🇭", label: "Philippines" },
  { code: "+64",  flag: "🇳🇿", label: "New Zealand" },
  { code: "+65",  flag: "🇸🇬", label: "Singapore" },
  { code: "+66",  flag: "🇹🇭", label: "Thailand" },
  { code: "+81",  flag: "🇯🇵", label: "Japan" },
  { code: "+82",  flag: "🇰🇷", label: "South Korea" },
  { code: "+84",  flag: "🇻🇳", label: "Vietnam" },
  { code: "+86",  flag: "🇨🇳", label: "China" },
  { code: "+90",  flag: "🇹🇷", label: "Turkey" },
  { code: "+91",  flag: "🇮🇳", label: "India" },
  { code: "+92",  flag: "🇵🇰", label: "Pakistan" },
  { code: "+94",  flag: "🇱🇰", label: "Sri Lanka" },
  { code: "+98",  flag: "🇮🇷", label: "Iran" },
  { code: "+212", flag: "🇲🇦", label: "Morocco" },
  { code: "+213", flag: "🇩🇿", label: "Algeria" },
  { code: "+216", flag: "🇹🇳", label: "Tunisia" },
  { code: "+234", flag: "🇳🇬", label: "Nigeria" },
  { code: "+254", flag: "🇰🇪", label: "Kenya" },
  { code: "+351", flag: "🇵🇹", label: "Portugal" },
  { code: "+353", flag: "🇮🇪", label: "Ireland" },
  { code: "+358", flag: "🇫🇮", label: "Finland" },
  { code: "+380", flag: "🇺🇦", label: "Ukraine" },
  { code: "+381", flag: "🇷🇸", label: "Serbia" },
  { code: "+385", flag: "🇭🇷", label: "Croatia" },
  { code: "+420", flag: "🇨🇿", label: "Czech Republic" },
  { code: "+421", flag: "🇸🇰", label: "Slovakia" },
  { code: "+966", flag: "🇸🇦", label: "Saudi Arabia" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+972", flag: "🇮🇱", label: "Israel" },
  { code: "+974", flag: "🇶🇦", label: "Qatar" },
  { code: "+977", flag: "🇳🇵", label: "Nepal" },
  { code: "+880", flag: "🇧🇩", label: "Bangladesh" },
  { code: "+998", flag: "🇺🇿", label: "Uzbekistan" },
];

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
  } = useForm<PersonalInfo>({
    defaultValues: { phoneCode: "+1", ...defaultValues },
  });

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

        {/* Phone — country code + number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-text-primary font-body">Phone</label>
          <div className="flex gap-2">
            <select
              {...register("phoneCode")}
              className="h-[42px] w-[120px] shrink-0 rounded-[var(--radius-sm)] border border-border-default bg-bg px-2.5 text-[14px] text-text-primary font-body outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors cursor-pointer"
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="555-123-4567"
              {...register("phoneNumber")}
              className="h-[42px] min-w-0 flex-1 rounded-[var(--radius-sm)] border border-border-default bg-bg px-3.5 text-[14px] text-text-primary placeholder:text-text-tertiary font-body outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
            />
          </div>
        </div>
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
