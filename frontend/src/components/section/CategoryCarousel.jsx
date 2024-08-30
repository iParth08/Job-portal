import { content, styles } from "@/constants";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

const CategoryCarousel = () => {
  return (
    <div className={`${styles.wrapperClass} flex-center`}>
      <div className="max-w-[500px]">
        <Carousel className="w-full max-w-full my-5 mx-auto">
          <CarouselContent>
            {content.categories.map((category, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Button variant="outline" className="rounded-full">
                  {category}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
