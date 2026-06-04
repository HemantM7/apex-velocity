import { vehicles } from "@/lib/data";
import { notFound } from "next/navigation";
import { VehicleColorsClient } from "./VehicleColorsClient";
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
    title: `${vehicle.name} — Colour Selection`,
    description: `Explore all available exterior colours for the ${vehicle.name}. ${vehicle.colors.length} bespoke finishes available.`,
  };
}

export default async function VehicleColorsPage({ params }: Props) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) notFound();
  return <VehicleColorsClient vehicle={vehicle} />;
}
