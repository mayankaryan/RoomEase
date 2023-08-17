import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-40">Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className="fixed right-14 top-7 flex gap-1 py-1 px-4 rounded-lg shadow shadow-black bg-gray-300 text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              close
            </button>
          </div>
          {place?.photos?.length > 0 && place.photos.map(photo => (
            <div>
              <img src={'http://localhost:4000/uploads/' + photo} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div>
              <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[1] && (
            <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer" src={'http://localhost:4000/uploads/' + place.photos[1]} alt="" />
          )}
          <div className="overflow-hidden">
            {place.photos?.[2] && (
              <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover cursor-pointer relative top-2" src={'http://localhost:4000/uploads/' + place.photos[2]} alt="" />
            )}
          </div>
        </div>
      </div>
      <button onClick={() => setShowAllPhotos(true)} className="absolute px-2 py-1 bg-white rounded-lg right-2 bottom-2 shadow shadow-md shadow-gray-500">
        show more photos
      </button>
    </div>
  );
}