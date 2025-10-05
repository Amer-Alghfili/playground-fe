"use client";

import React from "react";
import { useForm, useController } from "react-hook-form";
import Link from "next/link";
import { Logo } from "../../components/Logo";

// Type definition for form data
type CreateHostFormData = {
  hostId: string;
  name: string;
  hostFields: "POLITICS" | "HISTORY" | "DIPLOMACY" | "";
  salary: string;
  episodesPerWeek: "1" | "2" | "3";
};

export default function CreateHost() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<CreateHostFormData>({
    mode: "onBlur", // Validate on blur for better UX
    defaultValues: {
      hostId: "",
      name: "",
      hostFields: "",
      salary: "",
      episodesPerWeek: undefined,
    },
  });

  // Form submission handler
  const onSubmit = async (data: CreateHostFormData) => {
    try {
      console.log("Form submitted with data:", data);

      // Transform data for submission
      const submissionData = {
        hostId: data.hostId,
        name: data.name,
        hostFields: data.hostFields,
        salary: data.salary ? Number(data.salary) : undefined,
        episodesPerWeek: Number(data.episodesPerWeek),
      };

      console.log("Transformed data:", submissionData);

      // Placeholder for API call
      // await axios.post('http://localhost:4000/api/hosts', submissionData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Host created successfully!");

      // Reset form after successful submission
      reset({
        hostId: "",
        name: "",
        hostFields: "",
        salary: "",
        episodesPerWeek: undefined,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create host. Please try again.");
    }
  };

  // Custom validation function for host name (must include first and last name)
  const validateHostName = (value: string) => {
    const trimmedValue = value.trim();

    // Check if value contains at least one space
    if (!trimmedValue.includes(" ")) {
      return "Name must include first and last name separated by a space";
    }

    // Split by space and check if both parts exist and are non-empty
    const parts = trimmedValue.split(" ");
    const nonEmptyParts = parts.filter((part) => part.length > 0);

    if (nonEmptyParts.length < 2) {
      return "Name must include first and last name separated by a space";
    }

    return true;
  };

  // Custom validation function for Host ID (must start with "1")
  const validateHostId = (value: string) => {
    if (!value.startsWith("1")) {
      return "Host ID must start with '1'";
    }
    return true;
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <header className="flex items-center gap-4 p-4">
          <Logo />
        </header>
        <div className="px-6 py-6">
          <h1 className="text-white text-2xl font-bold mb-6">Create New Host</h1>
          <HostForm
            register={register}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            validateHostName={validateHostName}
            validateHostId={validateHostId}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex gap-0">
        <nav className="h-screen bg-[rgba(0,0,0,.1)] border-e border-e-[#2e2e38] min-w-[15em] px-6 py-6">
          <div className="mb-7">
            <Logo />
          </div>
          <ul className="text-white flex flex-col gap-2">
            <li>
              <Link href="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>Discover</li>
            <li>
              <Link href="/about" className="hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/create-podcast" className="hover:text-blue-400">
                Create Podcast
              </Link>
            </li>
            <li className="text-blue-400">Create Host</li>
          </ul>
        </nav>
        <main className="w-full p-8 overflow-auto">
          <h1 className="text-white text-3xl font-bold mb-8">Create New Host</h1>
          <HostForm
            register={register}
            control={control}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            validateHostName={validateHostName}
            validateHostId={validateHostId}
            isSubmitting={isSubmitting}
          />
        </main>
      </div>
    </>
  );
}

// Separate form component for reusability
function HostForm({
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
  validateHostName,
  validateHostId,
  isSubmitting,
}: {
  register: ReturnType<typeof useForm<CreateHostFormData>>["register"];
  control: ReturnType<typeof useForm<CreateHostFormData>>["control"];
  errors: ReturnType<typeof useForm<CreateHostFormData>>["formState"]["errors"];
  handleSubmit: ReturnType<typeof useForm<CreateHostFormData>>["handleSubmit"];
  onSubmit: (data: CreateHostFormData) => Promise<void>;
  validateHostName: (value: string) => string | boolean;
  validateHostId: (value: string) => string | boolean;
  isSubmitting: boolean;
}) {
  // Use useController for radio buttons to properly manage controlled state
  const { field: episodesPerWeekField } = useController({
    name: "episodesPerWeek",
    control,
    rules: { required: "Number of episodes per week is required" },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-2xl"
    >
      {/* Host ID Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="hostId" className="text-white font-medium">
          Host ID <span className="text-red-400">*</span>
        </label>
        <input
          id="hostId"
          type="text"
          {...register("hostId", {
            required: "Host ID is required",
            maxLength: {
              value: 3,
              message: "Host ID must not exceed 3 characters",
            },
            validate: validateHostId,
          })}
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-white w-full py-2 px-4 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="e.g., 123"
          disabled={isSubmitting}
          aria-invalid={errors.hostId ? "true" : "false"}
          aria-describedby={errors.hostId ? "hostId-error" : undefined}
          maxLength={3}
        />
        <div className="min-h-[20px]">
          {errors.hostId && (
            <span id="hostId-error" className="text-red-400 text-sm" role="alert">
              {errors.hostId.message}
            </span>
          )}
        </div>
      </div>

      {/* Name Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-white font-medium">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "Name is required",
            validate: validateHostName,
          })}
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-white w-full py-2 px-4 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="e.g., John Doe"
          disabled={isSubmitting}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        <div className="min-h-[20px]">
          {errors.name ? (
            <span id="name-error" className="text-red-400 text-sm" role="alert">
              {errors.name.message}
            </span>
          ) : (
            <span className="text-gray-400 text-xs">
              Must include first and last name separated by a space
            </span>
          )}
        </div>
      </div>

      {/* Host Fields Dropdown */}
      <div className="flex flex-col gap-2">
        <label htmlFor="hostFields" className="text-white font-medium">
          Host Fields <span className="text-red-400">*</span>
        </label>
        <select
          id="hostFields"
          {...register("hostFields", {
            required: "Host field is required",
          })}
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-white w-full py-2 px-4 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          aria-invalid={errors.hostFields ? "true" : "false"}
          aria-describedby={errors.hostFields ? "hostFields-error" : undefined}
        >
          <option value="">Select a field</option>
          <option value="POLITICS">Politics</option>
          <option value="HISTORY">History</option>
          <option value="DIPLOMACY">Diplomacy</option>
        </select>
        <div className="min-h-[20px]">
          {errors.hostFields && (
            <span
              id="hostFields-error"
              className="text-red-400 text-sm"
              role="alert"
            >
              {errors.hostFields.message}
            </span>
          )}
        </div>
      </div>

      {/* Salary Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="salary" className="text-white font-medium">
          Salary{" "}
          <span className="text-gray-400 text-sm font-normal">(Optional)</span>
        </label>
        <input
          id="salary"
          type="number"
          {...register("salary")}
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-white w-full py-2 px-4 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Enter salary amount"
          disabled={isSubmitting}
          aria-invalid={errors.salary ? "true" : "false"}
          aria-describedby={errors.salary ? "salary-error" : undefined}
          min="0"
          step="0.01"
        />
        <div className="min-h-[20px]">
          {errors.salary && (
            <span id="salary-error" className="text-red-400 text-sm" role="alert">
              {errors.salary.message}
            </span>
          )}
        </div>
      </div>

      {/* Number of Episodes Per Week - Radio Buttons */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-medium">
          Number of episodes per week <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-white cursor-pointer">
            <input
              type="radio"
              value="1"
              checked={episodesPerWeekField.value === "1"}
              onChange={(e) => episodesPerWeekField.onChange(e.target.value)}
              onBlur={episodesPerWeekField.onBlur}
              disabled={isSubmitting}
              className="w-5 h-5 border-[#2e2e38] bg-[rgba(0,0,0,.1)] text-blue-400 focus:ring-blue-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span>1</span>
          </label>
          <label className="flex items-center gap-3 text-white cursor-pointer">
            <input
              type="radio"
              value="2"
              checked={episodesPerWeekField.value === "2"}
              onChange={(e) => episodesPerWeekField.onChange(e.target.value)}
              onBlur={episodesPerWeekField.onBlur}
              disabled={isSubmitting}
              className="w-5 h-5 border-[#2e2e38] bg-[rgba(0,0,0,.1)] text-blue-400 focus:ring-blue-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span>2</span>
          </label>
          <label className="flex items-center gap-3 text-white cursor-pointer">
            <input
              type="radio"
              value="3"
              checked={episodesPerWeekField.value === "3"}
              onChange={(e) => episodesPerWeekField.onChange(e.target.value)}
              onBlur={episodesPerWeekField.onBlur}
              disabled={isSubmitting}
              className="w-5 h-5 border-[#2e2e38] bg-[rgba(0,0,0,.1)] text-blue-400 focus:ring-blue-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span>3</span>
          </label>
        </div>
        <div className="min-h-[20px]">
          {errors.episodesPerWeek && (
            <span
              id="episodesPerWeek-error"
              className="text-red-400 text-sm"
              role="alert"
            >
              {errors.episodesPerWeek.message}
            </span>
          )}
        </div>
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-6 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {isSubmitting ? "Creating..." : "Create Host"}
        </button>
        <Link
          href="/"
          className="bg-[rgba(0,0,0,.1)] border border-[#2e2e38] hover:border-blue-400 rounded-lg py-3 px-6 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 inline-block text-center"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
