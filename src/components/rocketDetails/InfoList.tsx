import React from "react";

interface InfoListProps {
  label: string;
  value: string;
}

const InfoList: React.FC<InfoListProps> = ({ label, value }) => {
  return (
    <li className="mb-2">
      {label} <br /> <span className="text-slate-500 text-lg">{value}</span>
    </li>
  );
};

export default InfoList;
