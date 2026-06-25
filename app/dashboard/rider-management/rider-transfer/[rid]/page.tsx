import RiderAssignParcelTable from "./RiderAssignParcelTable";

export default async function page({
  params,
}: {
  params: Promise<{ rid: string }>;
}) {
  const { rid } = await params;

  return (
    <div>
      <RiderAssignParcelTable riderId={rid} />
    </div>
  );
}
