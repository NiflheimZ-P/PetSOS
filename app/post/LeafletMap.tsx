"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type LeafletMapProps = {
  onSelect?: (v: { lat: number; lng: number; address?: string }) => void;
  defaultCenter?: { lat: number; lng: number };
};

export default function LeafletMap({
  onSelect,
  defaultCenter = { lat: 13.729, lng: 100.7775 },
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const clickHandlerRef = useRef<((e: any) => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      // ✅ กันปัญหา icon ไม่โหลด (หมุดไม่โผล่)
      const defaultIcon = L.icon({
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      const el = containerRef.current;
      if (cancelled || !el) return;

      // ✅ สร้าง map แค่ครั้งเดียว
      if (!mapRef.current) {
        // ถ้า container เคยถูก init (จาก HMR) ให้เคลียร์ id เดิม
        if ((el as any)._leaflet_id) (el as any)._leaflet_id = undefined;

        const map = L.map(el, { preferCanvas: true }).setView(
          [defaultCenter.lat, defaultCenter.lng],
          15
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        mapRef.current = map;

        // แก้กระพริบ/ขนาดเพี้ยนเมื่อ container เปลี่ยนขนาด
        setTimeout(() => map.invalidateSize(), 0);
        window.addEventListener("resize", () => map.invalidateSize());
      }

      // ✅ ผูก click handler โดยอ้างอิง mapRef เสมอ
      const handleClick = async (e: any) => {
        const map = mapRef.current;
        if (!map) return; // เผื่อโดนถอด

        const { lat, lng } = e.latlng;

        // reverse geocoding ชื่อสถานที่ (ถ้าเน็ตช้า/ผู้ใช้เปลี่ยนหน้า จะไม่พัง)
        let placeName = "ไม่ทราบชื่อสถานที่";
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();
          placeName = data?.display_name || placeName;
        } catch {}

        onSelect?.({ lat, lng, address: placeName });

        if (!mapRef.current) return; // เช็คอีกรอบหลัง await

        // ✅ สร้าง/ย้าย marker ด้วย icon ที่กำหนดเอง
        if (!markerRef.current) {
          markerRef.current = L.marker([lat, lng], { icon: defaultIcon }).addTo(map);
        } else {
          markerRef.current.setLatLng([lat, lng]);
        }
        markerRef.current.bindPopup(`📍 ${placeName}`).openPopup();
      };

      // ล้าง handler เดิมแล้วผูกใหม่ (กันซ้ำ)
      if (clickHandlerRef.current) {
        mapRef.current.off("click", clickHandlerRef.current);
      }
      mapRef.current.on("click", handleClick);
      clickHandlerRef.current = handleClick;
    })();

    // ❗️อย่าลบ map ใน cleanup (Dev Strict Mode จะกระพริบ)
    return () => {
      cancelled = true;
      // ถอดเฉพาะ handler เพื่อกันซ้อน
      if (mapRef.current && clickHandlerRef.current) {
        try {
          mapRef.current.off("click", clickHandlerRef.current);
        } catch {}
      }
      clickHandlerRef.current = null;
      // ถ้าต้องการลบ map จริง ๆ (ตอนออกจากเพจ) ค่อยทำที่จุด unmount ระดับสูงกว่า
    };
  }, [defaultCenter.lat, defaultCenter.lng, onSelect]);

  return <div ref={containerRef} className="w-full h-full rounded-xl" />;
}
