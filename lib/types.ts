import { StaticImageData } from "next/image";

export type WorkInfo = {
  role: string;
  companyName?: string;
  companyLogoUrl: StaticImageData;
  description?: string;
  listDescription?: string[];
  start_date?: Date;
  end_date?: Date;
  tags?: string[];
};

export type ProjectInfo = {
  projectName: string;
  projectLogoUrl?: StaticImageData;
  projectCaption: string;
  description?: string;
  listDescription?: string[];
  tags?: string[];
  projectLink?: string;
  customLogo?: React.ReactNode;
};
