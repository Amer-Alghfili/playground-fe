"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Logo } from "../../components/Logo";

// Type definition for form data
type PodcastFormData = {
  title: string;
  host: string;
  producer: string;
  domain: "politics" | "sport" | "gaming" | "business";
  platforms: string[];
};

export default function CreatePodcast() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PodcastFormData>({
    mode: "onBlur", // Validate on blur for better UX
    defaultValues: {
      title: "",
      host: "",
      producer: "",
      domain: undefined,
      platforms: [],
    },
  });

  // Form submission handler
  const onSubmit = async (data: PodcastFormData) => {
    try {
      console.log("Form submitted with data:", data);

      // Placeholder for API call
      // await axios.post('http://localhost:4000/api/podcasts', data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Podcast created successfully!");
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create podcast. Please try again.");
    }
  };

  // Custom validation function for host name
  const validateHostName = (value: string) => {
    const trimmedValue = value.trim();

    // Check if value contains at least one space
    if (!trimmedValue.includes(" ")) {
      return "Host name must include first and last name separated by a space";
    }

    // Split by space and check if both parts exist and are non-empty
    const parts = trimmedValue.split(" ");
    const nonEmptyParts = parts.filter((part) => part.length > 0);

    if (nonEmptyParts.length < 2) {
      return "Host name must include first and last name separated by a space";
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
          <h1 className="text-white text-2xl font-bold mb-6">
            Create New Podcast
          </h1>
          <PodcastForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            validateHostName={validateHostName}
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
            <li className="text-blue-400">Create Podcast</li>
          </ul>
        </nav>
        <main className="w-full p-8 overflow-auto">
          <h1 className="text-white text-3xl font-bold mb-8">
            Create New Podcast
          </h1>
          <PodcastForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            validateHostName={validateHostName}
            isSubmitting={isSubmitting}
          />
        </main>
      </div>
    </>
  );
}

// Separate form component for reusability
function PodcastForm({
  register,
  errors,
  handleSubmit,
  onSubmit,
  validateHostName,
  isSubmitting,
}: {
  register: ReturnType<typeof useForm<PodcastFormData>>["register"];
  errors: ReturnType<typeof useForm<PodcastFormData>>["formState"]["errors"];
  handleSubmit: ReturnType<typeof useForm<PodcastFormData>>["handleSubmit"];
  onSubmit: (data: PodcastFormData) => Promise<void>;
  validateHostName: (value: string) => string | boolean;
  isSubmitting: boolean;
}) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-2xl"
    >
      {/* Podcast Title Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-white font-medium">
          Podcast Title <span className="text-red-400">*</span>
        </label>
        <input
          id="title"
          type="text"
          {...register("title", {
            required: "Podcast title is required",
            maxLength: {
              value: 30,
              message: "Podcast title must not exceed 30 characters",
            },
          })}
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-white w-full py-2 px-4 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Enter podcast title"
          disabled={isSubmitting}
          aria-invalid={errors.title ? "true" : "false"}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <span id="title-error" className="text-red-400 text-sm" role="alert">
            {errors.title.message}
          </span>
        )}
      </div>

      {/* Podcast Host Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="host" className="text-white font-medium">
          Podcast Host <span className="text-red-400">*</span>
        </label>
        <input
          id="host"
          type="text"
          {...register("host", {
            required: "Podcast host is required",
            validate: validateHostName,
          })}
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-white w-full py-2 px-4 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="e.g., Amer Alghfaili"
          disabled={isSubmitting}
          aria-invalid={errors.host ? "true" : "false"}
          aria-describedby={errors.host ? "host-error" : undefined}
        />
        {errors.host && (
          <span id="host-error" className="text-red-400 text-sm" role="alert">
            {errors.host.message}
          </span>
        )}
        <span className="text-gray-400 text-xs">
          Must include first and last name separated by a space
        </span>
      </div>

      {/* Podcast Producer Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="producer" className="text-white font-medium">
          Podcast Producer <span className="text-red-400">*</span>
        </label>
        <input
          id="producer"
          type="text"
          {...register("producer", {
            required: "Podcast producer is required",
          })}
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-white w-full py-2 px-4 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="Enter producer name"
          disabled={isSubmitting}
          aria-invalid={errors.producer ? "true" : "false"}
          aria-describedby={errors.producer ? "producer-error" : undefined}
        />
        {errors.producer && (
          <span
            id="producer-error"
            className="text-red-400 text-sm"
            role="alert"
          >
            {errors.producer.message}
          </span>
        )}
      </div>

      {/* Podcast Domain Field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="domain" className="text-white font-medium">
          Podcast Domain <span className="text-red-400">*</span>
        </label>
        <select
          id="domain"
          {...register("domain", {
            required: "Podcast domain is required",
          })}
          className="border border-[#2e2e38] bg-[rgba(0,0,0,.1)] rounded-lg text-white w-full py-2 px-4 focus:outline-none focus:border-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
          aria-invalid={errors.domain ? "true" : "false"}
          aria-describedby={errors.domain ? "domain-error" : undefined}
        >
          <option value="">Select a domain</option>
          <option value="politics">Politics</option>
          <option value="sport">Sport</option>
          <option value="gaming">Gaming</option>
          <option value="business">Business</option>
        </select>
        {errors.domain && (
          <span id="domain-error" className="text-red-400 text-sm" role="alert">
            {errors.domain.message}
          </span>
        )}
      </div>

      {/* Podcast Platform Field */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-medium">
          Podcast Platforms{" "}
          <span className="text-gray-400 text-sm font-normal">(Optional)</span>
        </label>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-white cursor-pointer">
            <input
              type="checkbox"
              value="Youtube"
              {...register("platforms")}
              className="w-5 h-5 rounded border-[#2e2e38] bg-[rgba(0,0,0,.1)] text-blue-400 focus:ring-blue-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
            <span>Youtube</span>
          </label>
          <label className="flex items-center gap-3 text-white cursor-pointer">
            <input
              type="checkbox"
              value="Apple"
              {...register("platforms")}
              className="w-5 h-5 rounded border-[#2e2e38] bg-[rgba(0,0,0,.1)] text-blue-400 focus:ring-blue-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
            <span>Apple</span>
          </label>
          <label className="flex items-center gap-3 text-white cursor-pointer">
            <input
              type="checkbox"
              value="Spotify"
              {...register("platforms")}
              className="w-5 h-5 rounded border-[#2e2e38] bg-[rgba(0,0,0,.1)] text-blue-400 focus:ring-blue-400 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            />
            <span>Spotify</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-6 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {isSubmitting ? "Creating..." : "Create Podcast"}
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
