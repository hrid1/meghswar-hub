"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Upload, X, FileCheck2 } from "lucide-react";
import {
  useGetAdminBankAccountListQuery,
  useCreateTransferMutation,
} from "@/redux/features/financial-report/FinancialReportApi";
import { BankAccount } from "@/redux/features/financial-report/FinancialReportType";
import { uploadFileToAws } from "@/lib/upload";

interface FormValues {
  transferred_amount: number;
  admin_account_id: string;
  transaction_reference_id: string;
  notes: string;
}

export default function TransferForm() {
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const selectedAccountId = watch("admin_account_id");

  const { data: bankData, isLoading: bankLoading } =
    useGetAdminBankAccountListQuery();
  const [createTransfer, { isLoading: submitting }] =
    useCreateTransferMutation();

  const bankList: BankAccount[] = bankData?.data ?? [];
  const selectedAccount = bankList.find((b) => b.id === selectedAccountId);

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

      await createTransfer({
        transferred_amount: Number(formData.transferred_amount),
        admin_account_id: formData.admin_account_id,
        transaction_reference_id: formData.transaction_reference_id,
        proof_file_url: fileKey,
        notes: formData.notes || undefined,
      }).unwrap();

      toast.success("Transfer recorded successfully!");
      reset();
      clearFile();
    } catch (err: any) {
      setUploading(false);
      toast.error(err?.data?.message ?? "Something went wrong. Please try again.");
    }
  };

  const isBusy = uploading || submitting;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Record a New Transfer
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Fill in the details below to log a fund transfer.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount Transferred <span className="text-red-500">*</span>
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
                errors.transferred_amount ? "border-red-400" : "border-gray-200"
              }`}
              {...register("transferred_amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than 0" },
              })}
            />
          </div>
          {errors.transferred_amount && (
            <p className="text-red-500 text-xs mt-1">
              {errors.transferred_amount.message}
            </p>
          )}
        </div>

        {/* Bank Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Bank Account <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30 bg-white ${
              errors.admin_account_id ? "border-red-400" : "border-gray-200"
            }`}
            {...register("admin_account_id", {
              required: "Please select a bank account",
            })}
          >
            <option value="">
              {bankLoading ? "Loading accounts…" : "Select Account"}
            </option>
            {bankList.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.account_name} — {bank.account_number}
              </option>
            ))}
          </select>
          {errors.admin_account_id && (
            <p className="text-red-500 text-xs mt-1">
              {errors.admin_account_id.message}
            </p>
          )}

          {/* Selected account details */}
          {selectedAccount && (
            <div className="mt-2 bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 text-xs space-y-0.5">
              <p>
                <span className="text-gray-500">Holder:</span>{" "}
                <span className="font-medium text-gray-800">
                  {selectedAccount.account_holder_name}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Account No:</span>{" "}
                <span className="font-medium text-gray-800 font-mono">
                  {selectedAccount.account_number}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Branch:</span>{" "}
                <span className="font-medium text-gray-800">
                  {selectedAccount.branch_name}
                </span>
              </p>
              <p>
                <span className="text-gray-500">Balance:</span>{" "}
                <span className="font-semibold text-green-600">
                  ৳{Number(selectedAccount.current_balance).toLocaleString()}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Transaction Reference ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Reference ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. TXN-1234567890"
            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30 ${
              errors.transaction_reference_id
                ? "border-red-400"
                : "border-gray-200"
            }`}
            {...register("transaction_reference_id", {
              required: "Transaction reference ID is required",
            })}
          />
          {errors.transaction_reference_id && (
            <p className="text-red-500 text-xs mt-1">
              {errors.transaction_reference_id.message}
            </p>
          )}
        </div>

        {/* Proof Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proof of Transfer <span className="text-red-500">*</span>
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

        {/* Notes (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Revenue transfer for Week 4"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FE5000]/30 resize-none"
            {...register("notes")}
          />
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
            "Submit Transfer"
          )}
        </button>
      </form>
    </div>
  );
}
