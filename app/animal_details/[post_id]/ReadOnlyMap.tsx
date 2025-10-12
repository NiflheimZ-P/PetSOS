"use client";
// map from app\post\page.tsx n app\post\LeafletMap.tsx
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function ReadOnlyMap({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const L = (await import("leaflet")).default;

      const defaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const el = containerRef.current;
      if (!el) return;

      if ((el as any)._leaflet_id) (el as any)._leaflet_id = undefined;
      const map = L.map(el, { preferCanvas: true }).setView([lat, lng], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      L.marker([lat, lng], { icon: defaultIcon }).addTo(map);

      //disable mouse
      map.dragging.disable();
      // map.scrollWheelZoom.disable();
      // map.doubleClickZoom.disable();
      map.boxZoom.disable();
      // map.keyboard.disable();
    })();
  }, [lat, lng]);

  return <div ref={containerRef} className="w-full h-full rounded-xl" />;
}
