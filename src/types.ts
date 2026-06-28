/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CustomImages {
  profile: string;
  college: string;
  internship: string;
  cert_ibm: string;
  cert_nim: string;
  cert_csc: string;
  cert_aws: string;
  proj_zentora: string;
  proj_globalchat: string;
  proj_docmind: string;
  proj_rideeasy: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  extraPoints: string[];
  techStack: string[];
  liveLink: string;
  githubLink: string;
  color: string; // Tailwind bg color class for the neo-brutalist card accent
  imageKey: keyof CustomImages;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  imageKey: keyof CustomImages;
  color: string;
}

export interface Achievement {
  title: string;
  desc: string;
  badge: string;
  color: string;
}
