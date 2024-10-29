export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: {
    monthly?: number;
    hourly?: number;
    callout?: number;
    afterHours?: number;
  };
  category: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ServiceFormData {
  name: string;
  description: string;
  features: string[];
  price: {
    monthly?: number;
    hourly?: number;
    callout?: number;
    afterHours?: number;
  };
  category: string;
}