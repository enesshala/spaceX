// src/interfaces/rocket.ts
export interface Rocket {
  height: Measurement;
  diameter: Measurement;
  mass: Mass;
  first_stage: Stage;
  second_stage: Stage;
  engines: Engine;
  landing_legs: LandingLegs;
  payload_weights: PayloadWeight[];
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
}

export interface Measurement {
  meters: number;
  feet: number;
}

export interface CustomRocket {
  id: string;
  name: string;
  first_flight: string;
  height: Measurement;
  flickr_images: string[];
}

interface Mass {
  kg: number;
  lb: number;
}

interface Stage {
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
  payloads?: {
    composite_fairing: CompositeFairing;
    option_1: string;
  };
}

interface Thrust {
  kN: number;
  lbf: number;
}

interface Engine {
  isp: ISP;
  thrust_sea_level: Thrust;
  thrust_vacuum: Thrust;
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
}

interface ISP {
  sea_level: number;
  vacuum: number;
}

interface LandingLegs {
  number: number;
  material: string | null;
}

interface PayloadWeight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

interface CompositeFairing {
  height: Measurement;
  diameter: Measurement;
}
