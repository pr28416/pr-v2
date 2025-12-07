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
  customIcon?: React.ReactNode;
  iconBg?: string;
  kind?: "hackathon" | "side" | "nonprofit";
  wins?: string[];
};

export enum EventType {
  ProfilePicClicked = "profile_pic_clicked",
  GithubClicked = "github_clicked",
  LinkedInClicked = "linkedin_clicked",
  EmailClicked = "email_clicked",
  ExternalLinkClicked = "external_link_clicked",
  ResumeDownloaded = "resume_downloaded",
  ProjectLogoClicked = "project_logo_clicked",
  ProjectLinkClicked = "project_link_clicked",
  ProjectExpanded = "project_expanded",
  PageVisit = "page_visit",
  WorkExpanded = "work_expanded",
  WorkLogoClicked = "work_logo_clicked",
}
