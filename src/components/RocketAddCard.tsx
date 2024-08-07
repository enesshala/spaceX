import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { useRocketStore } from "@/state/useRocketStore";
import { Measurement } from "@/interfaces/rocket";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  first_flight: z.string().nonempty({ message: "First flight is required" }),
  height: z
    .string()
    .nonempty({ message: "Height is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Height must be a number" }),
  imgUrl: z.string().nonempty({ message: "Image url is required" }),
});

// Define the input types
type Inputs = {
  name: string;
  first_flight: string;
  height: Measurement;
  imgUrl: string;
};

const RocketAddCard = () => {
  const { addRocket } = useRocketStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addRocket({ ...data, flickr_images: [data.imgUrl], id: "" });
    console.log(data);
    // Close the dialog on successful submission
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger className="w-full h-full">
          <Button
            variant="outline"
            className="rounded-full bg-white p-5 shadow-none"
          >
            Add New Rocket
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Rocket</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new rocket.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="name">Name:</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="first_flight">First Flight:</Label>
              <Input id="first_flight" {...register("first_flight")} />
              {errors.first_flight && <span className="text-red-500">{errors.first_flight.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="height">Height:</Label>
              <Input id="height" {...register("height")} />
              {errors.height && <span className="text-red-500">{errors.height.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="imgUrl">Image URL:</Label>
              <Input id="imgUrl" type="text" {...register("imgUrl")} />
              {errors.imgUrl && <span className="text-red-500">{errors.imgUrl.message}</span>}
            </div>

            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RocketAddCard;
