"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Upload, X, FileCheck2 } from "lucide-react";
import { useCreateHubExpenseMutation } from "@/redux/features/financial-report/FinancialReportApi";
import { HubExpenseCategory } from "@/redux/features/financial-report/FinancialReportType";
import { uploadFileToAws } from "@/lib/upload";

const CATEGORIES: { value: HubExpenseCategory; label: string }[] = [
  { value: "OFFICE_RENT",   label: "Office Rent" },
  { value: "OFFICE_SUPPLY", label: "Office Supply" },
  { value: "UTILITIES",     label: "Utilities" },
  { value: "STATIONARY",    label: "Stationary" },
  { value: "MAINTENANCE",   label: "Maintenance" },
  { value: "SALARY",        label: "Salary" },
  { value: "OTHER",         label: "Other" },
];

interface FormValues {
  amount: number;
  category: HubExpenseCategory;
  reason: string;
}

export default function HubExpenseForm() {
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [createHubExpense, { isLoading: submitting }] =
    useCreateHubExpenseMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("File size must be under 2 MB.");
      return;
    }
    setProofFile(file);
  };

  const clearFile = () => {
    setProofFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (formData: FormValues) => {
    if (!proofFile) {
      toast.error("Please upload a proof file.");
      return;
    }

    try {
      setUploading(true);
      const { fileKey } = await uploadFileToAws(proofFile, "merchants/general");
      setUploading(false);

      await createHubExpense({
        amount: Number(formData.amount),
        category: formData.category,
        reason: formData.reason,
        proof_file_url: fileKey,
      }).unwrap();

      toast.success("Hub expense recorded successfully!");
      reset();
      clearFile();
    } catch (err: any) {
      setUploading(false);
      toast.error(
        err?.data?.message ?? "Something went wrong. Please try again."
      );
    }
  };

  const isBusy = uploading || submitting;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Record a New Expense
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Log a hub expense with proof of payment.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
              ৳
            </span>
            <input
              type="number"
              step="0.01"
              min="1"
              placeholder="0.00"
              className={`w-full border rounded-lg pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30 ${
                errors.amount ? "border-red-400" : "border-gray-200"
              }`}
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than 0" },
              })}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30 ${
              errors.category ? "border-red-400" : "border-gray-200"
            }`}
            {...register("category", { required: "Please select a category" })}
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Paid monthly electricity bill for the hub office"
            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30 resize-none ${
              errors.reason ? "border-red-400" : "border-gray-200"
            }`}
            {...register("reason", { required: "Reason is required" })}
          />
          {errors.reason && (
            <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>
          )}
        </div>

        {/* Proof Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proof of Expense <span className="text-red-500">*</span>
          </label>

          {proofFile ? (
            <div className="flex items-center gap-3 border border-green-200 bg-green-50 rounded-lg px-3 py-3">
              <FileCheck2 className="w-5 h-5 text-green-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-700 truncate">
                  {proofFile.name}
                </p>
                <p className="text-xs text-green-500">
                  {(proofFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="text-green-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg py-6 cursor-pointer hover:border-[#FE5000]/50 hover:bg-orange-50/30 transition-colors">
              <Upload className="w-6 h-6 text-gray-400" />
              <p className="text-sm text-gray-500">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPEG, PDF — max 2 MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isBusy}
          className="w-full flex items-center justify-center gap-2 bg-[#FE5000] hover:bg-[#e04800] disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-semibold text-sm transition-colors"
        >
          {isBusy ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {uploading ? "Uploading proof…" : "Submitting…"}
            </>
          ) : (
            "Submit Expense"
          )}
        </button>
      </form>
    </div>
  );
}
