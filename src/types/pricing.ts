export type PricingModel = 'monthly' | 'hourly' | 'project';

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod?: 'monthly' | 'yearly';
  features: string[];
}

export interface ServiceRate {
  standard: number;
  afterHours?: number;
  weekend?: number;
  callOut?: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  category: string;
  pricingModel: PricingModel;
  price: number;
  currency: string;
  rates?: ServiceRate;
  features: string[];
  sop: string[];
  valueAdd: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  packages: ServicePackage[];
}