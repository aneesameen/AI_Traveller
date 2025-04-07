import React from "react";

export default function StaticMap({ address }) {
  const zoom = 11;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    address
  )}&zoom=${zoom}&size=800x500&markers=${encodeURIComponent(address)}&key=${
    import.meta.env.VITE_GOOGLE_PLACE_API_KEY
  }`;

  return (
    <div className="relative mt-4">
      <img
        className="w-full h-[350px] object-cover rounded-2xl shadow-lg"
        src={mapUrl}
        alt="Location map"
      />
    </div>
  );
}
