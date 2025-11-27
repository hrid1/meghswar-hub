import { NextResponse, NextRequest } from "next/server";

// Small mock dataset for riders (keeps API self-contained)
const MOCK_RIDERS = [
  {
    riderId: "RDR-101",
    rider: "Rakib Hasan",
    riderImg: "https://i.pravatar.cc/150?img=32",
    riderPhone: "01711-223344",
    vehicleType: "Bike",
    licenseNo: "LIC-55421",
    nid: "19987654321",
    deliveryCompleted: 120,
    deliveryReturn: 8,
    totalCash: 34500,
  },
  {
    riderId: "RDR-102",
    rider: "Sajid Ahmed",
    riderImg: "https://i.pravatar.cc/150?img=45",
    riderPhone: "01822-556677",
    vehicleType: "Scooter",
    licenseNo: "LIC-88412",
    nid: "20034567890",
    deliveryCompleted: 89,
    deliveryReturn: 5,
    totalCash: 22800,
  },
  {
    riderId: "RDR-103",
    rider: "Tanvir Islam",
    riderImg: "https://i.pravatar.cc/150?img=12",
    riderPhone: "01933-112233",
    vehicleType: "Cycle",
    licenseNo: "LIC-33219",
    nid: "19856789345",
    deliveryCompleted: 150,
    deliveryReturn: 12,
    totalCash: 41200,
  },
];

export async function GET(
  _req: NextRequest,
  { params }: { params: { id?: string } | Promise<{ id: string }> }
) {
  // Next's route typing sometimes passes params as a Promise; handle both
  const resolvedParams = params instanceof Promise ? await params : params;
  const id = resolvedParams?.id;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const rider = MOCK_RIDERS.find((r) => r.riderId === id);
  if (!rider) return NextResponse.json({ error: "Rider not found" }, { status: 404 });

  return NextResponse.json(rider);
}
