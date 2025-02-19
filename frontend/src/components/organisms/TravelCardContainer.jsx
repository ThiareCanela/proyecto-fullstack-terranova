import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TravelCard from "./TravelCard";

const TravelCardContainer = () => {
  const navigate = useNavigate();

  const allPlaces = [
    { image: "https://i.natgeofe.com/k/f576c284-661a-4046-ba51-fa95699e1a8b/hawaii-beach.png", location: "Hawaii", name: "Sunset Beach", price: 250, rating: 4.8 },
    { image: "https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/09/shutterstock_219250780-800.jpg", location: "Switzerland", name: "Alpine Retreat", price: 320, rating: 4.9 },
    { image: "https://static.nationalgeographic.es/files/styles/image_3200/public/nationalgeographic1758450.webp?w=760&h=507", location: "Canada", name: "Whispering Pines", price: 180, rating: 4.7 },
    { image: "https://www.travel-guide.es/media/new-york.jpeg", location: "New York", name: "City Lights Hotel", price: 400, rating: 4.6 },
    { image: "https://mediaim.expedia.com/destination/9/cd8a3f3db7149b0ce36d052aea1182df.jpg", location: "Dubai", name: "Sahara Oasis", price: 290, rating: 4.5 },
    { image: "https://static.barcelo.com/content/dam/bhg/master/es/hoteles/maldives/barcelo-whale-lagoon-maldives/main-photos/hotel/BWLM_VIEW_08.jpg", location: "Maldives", name: "Blue Lagoon", price: 350, rating: 4.9 },
    { image: "https://media.worldnomads.com/social-share-images/italy/italy-5-things-social.jpg", location: "Italy", name: "Lake Como Resort", price: 270, rating: 4.8 },
    { image: "https://cdn.forevervacation.com/uploads/blog/thailand-visitor-guide-things-to-do-4406.jpg", location: "Thailand", name: "Golden Pagoda", price: 220, rating: 4.7 },
    { image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/03/05150015/bergen.jpeg", location: "Norway", name: "Aurora Cabin", price: 310, rating: 4.9 },
    { image: "https://cdn.sanity.io/images/rizm0do5/production/31559d4749a707c3bb916abaadb05acbb3cb4eb2-1078x718.jpg", location: "Japan", name: "Kyoto Gardens", price: 280, rating: 4.8 },
    { image: "https://www.frenchclass.in/wp-content/uploads/2024/01/cities-in-france-paris-laforet.webp", location: "France", name: "Paris View", price: 500, rating: 4.7 },
    { image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb", location: "Australia", name: "Great Barrier Reef", price: 320, rating: 4.9 },
    { image: "https://cdn.britannica.com/71/73371-050-9DFAEC1E/Reykjavik-Iceland.jpg", location: "Iceland", name: "Glacier Lodge", price: 360, rating: 4.8 },
    { image: "https://www.intrepidtravel.com/v3/assets/blt0de87ff52d9c34a8/blt84e6f613930bd904/63c9c76e75a0df5fb06eec98/Intrepid_Travel-brazil_rio-de-janeiro_botafogo-bay-aerial_ss-435627745_2018.jpg?branch=prd", location: "Brazil", name: "Amazon Retreat", price: 190, rating: 4.6 },
    { image: "https://www.adventureworld.com/media/uvhb1u1l/south-africa-cape-town-table-mountain-national-park.jpg?center=0.3369099149035452%2C0.4887274510874777&format=webp&mode=crop&width=1920&height=600&quality=80", location: "South Africa", name: "Safari Escape", price: 400, rating: 4.9 },
    { image: "https://img.static-kl.com/images/media/B2A91919-D584-4762-B918AF2FCB63F775", location: "Mexico", name: "Cancún Paradise", price: 230, rating: 4.7 },
    { image: "https://www.omintassistance.com.ar/blog/wp-content/uploads/2018/01/Grecia.jpg", location: "Greece", name: "Santorini Sunset", price: 450, rating: 4.9 },
    { image: "https://static.nationalgeographicla.com/files/styles/image_3200/public/nationalgeographic_2744265.jpg?w=1900&h=1267", location: "Argentina", name: "Patagonia Adventure", price: 250, rating: 4.8 },
  ];

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(shuffleArray([...allPlaces]).slice(0, 9));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {places.map((place, index) => (
        <TravelCard key={index} {...place} onDetail={() => navigate("/detalle")} />
      ))}
    </div>
  );
};

export default TravelCardContainer;
/*CODIGO PARA JALAR DATOS CON JSON

import TravelCard from "./TravelCard";
import data from "../../data/places.json"; // Simulación de datos

const TravelCardContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
      {data.map((place, index) => (
        <TravelCard key={index} {...place} />
      ))}
    </div>
  );
};

export default TravelCardContainer;

*/
