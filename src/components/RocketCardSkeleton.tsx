import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const RocketCardSkeleton: React.FC = () => {
  return (
    <Card className="cursor-pointer animate-pulse">
      <CardHeader>
        <CardTitle><div className="bg-gray-300 rounded-md h-6 w-3/4"></div></CardTitle>
        <CardDescription><div className="bg-gray-300 rounded-md h-4 w-1/2"></div></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-300 rounded-md h-4 w-1/3 mb-2"></div>
        <div className="bg-gray-300 rounded-md h-4 w-1/4 mb-2"></div>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="carousel-item">
              <div className="bg-gray-300 h-48"></div>
            </CarouselItem>
            <CarouselItem className="carousel-item">
              <div className="bg-gray-300 h-48"></div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default RocketCardSkeleton;