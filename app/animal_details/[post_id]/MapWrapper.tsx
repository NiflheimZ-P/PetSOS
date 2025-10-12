"use client";
import dynamic from "next/dynamic";

const ReadOnlyMap = dynamic(() => import("./ReadOnlyMap"), { ssr: false });

export default function MapWrapper({ lat, lng }: { lat: number; lng: number }) {
  return <ReadOnlyMap lat={lat} lng={lng} />;
}
