type Vehicle = {
  vin: string;
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  location?: string;
  tag?: string;
  createdAt: Date;
  updatedAt: Date;
};

export {
  type Vehicle
};
