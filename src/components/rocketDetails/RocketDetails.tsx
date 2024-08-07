import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRocketFavoritesStore } from "@/state/useRocketFavoritesStore";
import { Toaster, toast } from "sonner";
import { useRocket } from "@/hooks/useRocket";
import InfoCard from "./InfoCard";
import InfoList from "./InfoList";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RocketDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useRocketFavoritesStore();
  const isFavorite = favorites.has(id!);

  const { data: rocket, isLoading, error } = useRocket(id!);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;
  if (!rocket) return <p>No Rocket Found</p>;

  const handleToggleFavorite = () => {
    toggleFavorite(rocket.id);
    const message = isFavorite
      ? `${rocket.name} has been removed from favorites!`
      : `${rocket.name} has been added to favorites!`;
    toast(message, { type: isFavorite ? "warning" : "success" });
  };
  return (
    <div className="p-10 px-20 grid grid-cols-4 grid-rows-1 gap-5">
      <div className="sticky top-0">
        <div className="flex items-center">
          <Button
            variant={"default"}
            onClick={() => navigate(`/`)}
            className="rounded-full"
          >
            Return
          </Button>
        </div>

        <div className="mt-10">
          <h1 className="text-3xl mb-10 font-medium">{rocket.name}</h1>
          <ul>
            <InfoList label="Type" value={rocket.type} />
            <InfoList label="Company" value={rocket.company} />
            <InfoList label="First Flight" value={rocket.first_flight} />
            <InfoList label="Country" value={rocket.country} />
            <InfoList label="Description" value={rocket.description} />
          </ul>
          <a
            className="mt-10"
            href={rocket.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more on Wikipedia
          </a>
        </div>
      </div>

      <div className="col-span-2 text-center py-10">
        <div className="flex flex-col items-center gap-10">
          <Carousel className="w-[70%]">
            <CarouselContent>
              {rocket.flickr_images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img
                      key={index}
                      src={image}
                      alt={`${rocket.name} ${index}`}
                      className="w-full"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <Button
          onClick={handleToggleFavorite}
          variant={"secondary"}
          className={`mt-10 text-primary  rounded-full ${
            isFavorite
              ? "border-red-700 bg-red-700 hover:bg-red-700 text-white"
              : "border-gray-500 bg-white"
          }`}
        >
          {isFavorite ? "Unfavorite" : "Make Favorite"}
        </Button>
      </div>
      <div className="sticky top-5">
        <div className="grid grid-cols-2 gap-5">
          <h1 className="col-span-2 font-medium text-xl">Overview</h1>
          <InfoCard
            title="Height"
            firstLabel="Meters"
            firstValue={rocket.height.meters}
            secondLabel="Feet"
            secondValue={rocket.height.feet}
          />
          <InfoCard
            title="Diameter"
            firstLabel="Meters"
            firstValue={rocket.diameter.meters}
            secondLabel="Feet"
            secondValue={rocket.diameter.feet}
          />
          <InfoCard
            title="Mass"
            firstLabel="Kilograms"
            firstValue={rocket.mass.kg}
            secondLabel="Pounds"
            secondValue={rocket.mass.lb}
          />
          <h1 className="col-span-2 font-medium text-xl">First Stage</h1>
          <InfoCard
            title="Thrust Sea Level"
            firstLabel="Kilonewtons"
            firstValue={rocket.first_stage.thrust_sea_level.kN}
            secondLabel="Pounds-Force"
            secondValue={rocket.first_stage.thrust_sea_level.lbf}
          />
          <InfoCard
            title="Thrust Vacuum"
            firstLabel="Kilonewtons"
            firstValue={rocket.first_stage.thrust_vacuum.kN}
            secondLabel="Pounds-Force"
            secondValue={rocket.first_stage.thrust_vacuum.lbf}
          />
          <h1 className="col-span-2 font-medium text-xl">Second Stage</h1>
          <InfoCard
            title="Thrust"
            firstLabel="Kilonewtons"
            firstValue={rocket.second_stage.thrust.kN}
            secondLabel="Pounds-Force"
            secondValue={rocket.second_stage.thrust.lbf}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default RocketDetails;
