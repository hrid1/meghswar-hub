import React from "react";

export default function FinancialReport() {
  return (
    <section className="grid grid-cols-6 gap-5">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </section>
  );
}

const Card = () => {
  return (
    <div className=" border border-gray-100 shadow rounded-2xl p-4">
      <p className="font-medium">Avaiable Balance</p>
      <h2 className="text-2xl font-semibold">334000</h2>
    </div>
  );
};
