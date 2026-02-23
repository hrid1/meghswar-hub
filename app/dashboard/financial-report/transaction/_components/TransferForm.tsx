"use client";

import { useForm } from "react-hook-form";

export default function TransferForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Record a New Transfer</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount */}
        <div>
          <label className="block font-medium mb-1">
            Amount Transferred (BDT)
          </label>
          <input
            type="number"
            placeholder="Enter Amount"
            className="w-full border rounded-md p-2"
            {...register("amount", { required: "Amount is required" })}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">
              {String(errors.amount.message)}
            </p>
          )}
        </div>

        {/* Admin Bank Account */}
        <div>
          <label className="block font-medium mb-1">Admin Bank Account</label>
          <select
            className="w-full border rounded-md p-2"
            {...register("bank", { required: "Please select a bank" })}
          >
            <option value="">Select Account</option>
            <option value="DBBL">DBBL</option>
            <option value="Islami Bank">Islami Bank</option>
            <option value="BRAC Bank">BRAC Bank</option>
          </select>
          {errors.bank && (
            <p className="text-red-500 text-sm">
              {String(errors.bank.message)}
            </p>
          )}
        </div>

        {/* Transaction Reference ID */}
        <div>
          <label className="block font-medium mb-1">
            Transaction Reference ID
          </label>
          <input
            type="text"
            placeholder="Optional Reference ID"
            className="w-full border rounded-md p-2"
            {...register("referenceId")}
          />
        </div>

        {/* Proof Upload */}
        <div>
          <label className="block font-medium mb-1">Proof Upload</label>

          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <input
              type="file"
              className="w-full text-sm"
              accept=".png, .jpg, .jpeg, .pdf"
              {...register("proof", {
                required: "Proof file is required",
              })}
            />
            <p className="text-gray-500 text-sm mt-2">
              PNG, JPEG, PDF (Max 2MB)
            </p>
          </div>

          {errors.proof && (
            <p className="text-red-500 text-sm">
              {String(errors.proof.message)}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold"
        >
          Submit Transfer Log
        </button>
      </form>
    </div>
  );
}
