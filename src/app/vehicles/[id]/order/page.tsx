import { vehicles } from "@/lib/data";
import { notFound } from "next/navigation";
import { OrderClient } from "./OrderClient";
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
    title: `Order ${vehicle.name} | Apex Velocity`,
    description: `Place your order for the ${vehicle.name}. Configure, personalise, and reserve your vehicle today.`,
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) notFound();
  return <OrderClient vehicle={vehicle} />;
}
