import { useEffect, useState } from "react";

export default function ExploreGrid() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          "https://picsum.photos/v2/list?page=1&limit=102"
        );
        if (!res.ok) throw new Error("Failed to fetch images");

        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("❌ Error fetching images:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return <div className="text-center mt-4 text-white">Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-[1px] bg-black pb-14">
      {images.map((img) => (
        <div key={img.id} className="aspect-square overflow-hidden">
          <img
            src={`https://picsum.photos/id/${img.id}/500/500`}
            alt={img.author}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
