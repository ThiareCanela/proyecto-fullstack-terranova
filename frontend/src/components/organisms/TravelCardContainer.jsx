import { useNavigate } from "react-router-dom";
import TravelCard from "./TravelCard";

/*SIMULACION DE DATOS */

const TravelCardContainer = () => {
  const places = [
    {
      image:
        "https://i.natgeofe.com/k/f576c284-661a-4046-ba51-fa95699e1a8b/hawaii-beach.png",
      location: "Hawaii",
      name: "Sunset Beach",
      price: 250,
      rating: 4.8,
    },
    {
      image:
        "https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/09/shutterstock_219250780-800.jpg",
      location: "Switzerland",
      name: "Alpine Retreat",
      price: 320,
      rating: 4.9,
    },
    {
      image:
        "https://static.nationalgeographic.es/files/styles/image_3200/public/nationalgeographic1758450.webp?w=760&h=507",
      location: "Canada",
      name: "Whispering Pines",
      price: 180,
      rating: 4.7,
    },
    {
      image: "https://www.travel-guide.es/media/new-york.jpeg",
      location: "New York",
      name: "City Lights Hotel",
      price: 400,
      rating: 4.6,
    },
    {
      image:
        "https://mediaim.expedia.com/destination/9/cd8a3f3db7149b0ce36d052aea1182df.jpg",
      location: "Dubai",
      name: "Sahara Oasis",
      price: 290,
      rating: 4.5,
    },
    {
      image:
        "https://static.barcelo.com/content/dam/bhg/master/es/hoteles/maldives/barcelo-whale-lagoon-maldives/main-photos/hotel/BWLM_VIEW_08.jpg",
      location: "Maldives",
      name: "Blue Lagoon",
      price: 350,
      rating: 4.9,
    },
    {
      image:
        "https://media.worldnomads.com/social-share-images/italy/italy-5-things-social.jpg",
      location: "Italy",
      name: "Lake Como Resort",
      price: 270,
      rating: 4.8,
    },
    {
      image:
        "https://cdn.forevervacation.com/uploads/blog/thailand-visitor-guide-things-to-do-4406.jpg",
      location: "Thailand",
      name: "Golden Pagoda",
      price: 220,
      rating: 4.7,
    },
    {
      image:
        "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/03/05150015/bergen.jpeg",
      location: "Norway",
      name: "Aurora Cabin",
      price: 310,
      rating: 4.9,
    },
  ];

  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {places.map((place, index) => (
        <TravelCard
          key={index}
          {...place}
          onDetail={() => navigate("/detalle")}
        />
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
