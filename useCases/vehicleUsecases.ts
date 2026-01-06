import { Vehicle } from "@/domain/vehicle";
import { VehicleRepository } from "@/repositories/vehicleRepository";
import { UseCase } from "./usecases";

type CreateVehicleRequest = {
  vin: string;
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  location?: string;
  tag?: string;
};

type CreateVehicleResponse = {
  data: Vehicle;
};

class CreateVehicleUseCase extends UseCase<CreateVehicleRequest, CreateVehicleResponse> {
  private vehicleRepository: VehicleRepository;
  constructor({vehicleRepository}: {vehicleRepository: VehicleRepository}) {
    super();
    this.vehicleRepository = vehicleRepository;
  }

  async execute(request: CreateVehicleRequest): Promise<CreateVehicleResponse> {
    const now = new Date();
    const newVehicle: Vehicle = {
      ...request,
      createdAt: now,
      updatedAt: now,
    };
    const savedVehicle = await this.vehicleRepository.put(newVehicle);
    const response: CreateVehicleResponse = { data: savedVehicle };
    return response;
  }
}

type UpdateVehicleRequest = {
  vin: string;
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  location?: string;
  tag?: string;
};

type UpdateVehicleResponse = {
  data: Vehicle;
};

class UpdateVehicleUseCase extends UseCase<UpdateVehicleRequest, UpdateVehicleResponse> {
  private vehicleRepository: VehicleRepository;
  constructor({vehicleRepository}: {vehicleRepository: VehicleRepository}) {
    super();
    this.vehicleRepository = vehicleRepository;
  }

  async execute(request: UpdateVehicleRequest): Promise<UpdateVehicleResponse> {
    const existingVehicle = await this.vehicleRepository.get(request.vin);
    if (!existingVehicle) {
      throw new Error("Vehicle not found");
    }
    const updatedVehicle: Vehicle = {
      ...existingVehicle,
      ...request,
      updatedAt: new Date(),
    };
    const savedVehicle = await this.vehicleRepository.put(updatedVehicle);
    const response: CreateVehicleResponse = { data: savedVehicle };
    return response;
  }
}

type GetVehicleRequest = {
  vin: string;
};

type GetVehicleResponse = {
  data: Vehicle;
};

class GetVehicleUseCase extends UseCase<GetVehicleRequest, GetVehicleResponse> {
  private vehicleRepository: VehicleRepository;
  constructor({vehicleRepository}: {vehicleRepository: VehicleRepository}) {
    super();
    this.vehicleRepository = vehicleRepository;
  }

  async execute(request: GetVehicleRequest): Promise<GetVehicleResponse> {
    const vehicle = await this.vehicleRepository.get(request.vin);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return { data: vehicle };
  }
}

type GetAllVehicleResponse = {
  data: Vehicle[];
}

class GetAllVehiclesUseCase extends UseCase<void, GetAllVehicleResponse> {
  private vehicleRepository: VehicleRepository;
  constructor({vehicleRepository}: {vehicleRepository: VehicleRepository}) {
    super();
    this.vehicleRepository = vehicleRepository;
  }

  async execute(): Promise<GetAllVehicleResponse> {
    const vehicles = await this.vehicleRepository.getAll();
    return { data: vehicles };
  }
}

type DeleteVehicleRequest = {
  vin: string;
};

type DeleteVehicleResponse = {
  data: null;
};

class DeleteVehicleUseCase extends UseCase<DeleteVehicleRequest, DeleteVehicleResponse> {
  private vehicleRepository: VehicleRepository;
  constructor({vehicleRepository}: {vehicleRepository: VehicleRepository}) {
    super();
    this.vehicleRepository = vehicleRepository;
  }

  async execute(request: DeleteVehicleRequest): Promise<DeleteVehicleResponse> {
    const vehicle = await this.vehicleRepository.delete(request.vin);
    return {data: null};
  }
}

type DeleteAllVehicleResponse = {
  data: null;
}

class DeleteAllVehiclesUseCase extends UseCase<void, DeleteAllVehicleResponse> {
  private vehicleRepository: VehicleRepository;
  constructor({vehicleRepository}: {vehicleRepository: VehicleRepository}) {
    super();
    this.vehicleRepository = vehicleRepository;
  }

  async execute(): Promise<DeleteAllVehicleResponse> {
    const vehicles = await this.vehicleRepository.deleteAll();
    return { data: null };
  }
}

export {
  CreateVehicleUseCase, DeleteAllVehiclesUseCase, DeleteVehicleUseCase, GetAllVehiclesUseCase, GetVehicleUseCase, UpdateVehicleUseCase, type CreateVehicleRequest, type DeleteVehicleRequest, type GetVehicleRequest, type UpdateVehicleRequest
};

