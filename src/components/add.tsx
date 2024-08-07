import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the schema using Zod
const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  first_flight: z.string().nonempty({ message: "First flight is required" }),
  height: z
    .string()
    .nonempty({ message: "Height is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Height must be a number" }),
});

// Define the input types
type Inputs = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Input */}
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      {/* First Flight Input */}
      <div>
        <label htmlFor="first_flight">First Flight:</label>
        <input id="first_flight" {...register("first_flight")} />
        {errors.first_flight && <span>{errors.first_flight.message}</span>}
      </div>

      {/* Height Input */}
      <div>
        <label htmlFor="height">Height:</label>
        <input id="height" {...register("height")} />
        {errors.height && <span>{errors.height.message}</span>}
      </div>

      <input type="submit" />
    </form>
  );
}