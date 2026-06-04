import { vehicles } from "@/lib/data";
import { notFound } from "next/navigation";
import { VehicleDetailClient } from "./VehicleDetailClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} | Apex Velocity`,
    description: vehicle.description,
    openGraph: {
      images: [{ url: vehicle.images.hero }],
    },
  };
}

export default async function VehicleDetailPage({ params }: Props) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) notFound();

  const related = vehicles.filter((v) => v.id !== id).slice(0, 3);

  return <VehicleDetailClient vehicle={vehicle} related={related} />;
}
