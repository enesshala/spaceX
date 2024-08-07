import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

interface InfoCardProps {
  title: string;
  firstLabel: string;
  firstValue: number | string;
  secondLabel: string;
  secondValue: number | string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  firstLabel,
  firstValue,
  secondLabel,
  secondValue,
}) => {
  return (
    <div className="w-52 h-fit bg-white rounded-xl p-5">
      <h3 className="text-lg text-center font-medium">{title}</h3>
      <h1 className="flex justify-between">
        <span className="text-gray-400 ml-full">{firstLabel}:</span>
        {firstValue}
      </h1>
      <Separator />
      <h1 className="flex justify-between">
        <span className="text-gray-400 mr-full">{secondLabel}:</span>{" "}
        {secondValue}
      </h1>
    </div>
  );
};

export default InfoCard;
