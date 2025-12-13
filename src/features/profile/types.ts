import React from 'react';

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CTOTriageOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProfileSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

