import * as React from "react";
import { CustomRocket, Rocket } from "../interfaces/rocket";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRocketFavoritesStore } from "@/state/useRocketFavoritesStore";
import { Toaster, toast } from "sonner";
import { Button } from "./ui/button";
import { RiSearch2Line } from "react-icons/ri";
import { IoHeartSharp } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { MdOutlineArrowRightAlt } from "react-icons/md";


interface RocketCardProps {
  rocket: Rocket | CustomRocket;
  onClick: () => void;
}

const RocketCard: React.FC<RocketCardProps> = ({ rocket, onClick }) => {
  const { favorites, toggleFavorite } = useRocketFavoritesStore();
  const isFavorite = favorites.has(rocket?.id);

  const handleToggleFavorite = () => {
    toggleFavorite(rocket.id);
    const message = isFavorite
      ? `${rocket.name} has been removed from favorites!`
      : `${rocket.name} has been added to favorites!`;
    toast(message, { type: isFavorite ? "warning" : "success" });
  };

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer rounded-[50px] shadow-none border-none"
    >
      <CardHeader className="relative">
        <img
          src={rocket.flickr_images[0]}
          alt={`Rocket ${rocket.name}`}
          className="rounded-2xl h-44"
        />
        <Button
          className="absolute top-7 right-8 rounded-full bg-[#151515]"
          size={"icon"}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            handleToggleFavorite();
          }}
        >
          {isFavorite ? <IoHeartSharp /> : <IoHeartOutline />}
        </Button>
      </CardHeader>
      <CardContent className="">
        <CardTitle className="uppercase text-2xl">{rocket.name}</CardTitle>
        <div className="flex justify-between items-center">
          <h1>
            <span className="text-slate-500">First flight:</span>{" "}
            {rocket.first_flight}
          </h1>
          <MdOutlineArrowRightAlt className="text-2xl" />
        </div>
        <Toaster />
      </CardContent>
    </Card>
  );
};

export default RocketCard;
