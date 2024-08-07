import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRockets } from "../hooks/useRockets";
import RocketCard from "../components/RocketCard";
import RocketCardSkeleton from "@/components/RocketCardSkeleton";
import RocketAddCard from "@/components/RocketAddCard";
import { Input } from "@/components/ui/input";
import { useRocketStore } from "@/state/useRocketStore";
import { CustomRocket, Rocket } from "@/interfaces/rocket";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: rockets2, isLoading, error, isSuccess } = useRockets();
  const { rockets, addRocket, setRockets } = useRocketStore();
  const [searchResults, setSearchResults] = useState<Rocket[] | CustomRocket[]>(
    []
  );

  const onSearch = (e: any) => {
    const filteredRockets = rockets.filter((el) =>
      el.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredRockets);
    if (!e.target.value) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const combinedArray = [...rockets, ...rockets2];
      if (rockets.some((el) => rockets2.includes(el as any))) {
        return;
      }
      setRockets(combinedArray);
    }
  }, [rockets2, addRocket]);
  if (isLoading)
    return (
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 4 }, (_, index) => (
          <RocketCardSkeleton key={index} />
        ))}
      </div>
    );

  if (error instanceof Error)
    return (
      <div className="text-center">
        <p>Error: {error.message}</p>
      </div>
    );

  if (rockets && rockets.length === 0) {
    return (
      <div className="text-center">No Rockets Found. Add some new Rockets!</div>
    );
  }

  const cardClick = (rocket: Rocket | CustomRocket) => {
    if (rocket.id) {
      navigate(`/rockets/${rocket.id}`);
      return;
    }
    alert("This Rocked has not enough information provided!");
  };

  return (
    <div className="bg-[#f3f5f6] container mx-auto px-4">
      <div className="flex justify-between pt-10">
        <img src="/logo.png" alt="Logo" className="h-7" />
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            onChange={onSearch}
            className="rounded-full bg-white p-5 shadow-none"
          />

          {searchResults.length ? (
            <ul
              className={
                "absolute z-50 flex flex-col p-5 rounded-lg top-12 right-0 w-80 bg-white space-y-3"
              }
            >
              {searchResults.map((el: any) => (
                <li>
                  <Link to={`/rockets/${el.id}`}>{el.name}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <h1 className="mt-10 text-3xl font-medium">
        Explore the Frontiers of Space
      </h1>
      <h1 className="mb-10 mt-5 text-xl">List of all Rockets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {rockets?.map((rocket) => (
          <RocketCard
            key={rocket.id}
            rocket={rocket}
            onClick={() => cardClick(rocket)}
          />
        ))}
        <RocketAddCard />
      </div>
    </div>
  );
};

export default Home;
