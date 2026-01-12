import { Vehicle } from "./domain/vehicle";
import { KVVehicleRepository } from "./repositories/vehicleRepository";
import { KVVinApiRepository } from "./repositories/vinApiRepository";
import { CreateVehicleRequest, CreateVehicleUseCase, DeleteAllVehiclesUseCase, DeleteVehicleRequest, DeleteVehicleUseCase, GetAllVehiclesUseCase, GetVehicleRequest, GetVehicleUseCase, UpdateVehicleRequest, UpdateVehicleUseCase } from "./useCases/vehicleUsecases";
import { GetVinDetailsRequest, GetVinDetailsUseCase } from "./useCases/vinApiUseCases";

const createVehicle = async (params: CreateVehicleRequest): Promise<Vehicle> => {
  const repository = new KVVehicleRepository();
  const createVehicleUseCase = new CreateVehicleUseCase({ vehicleRepository: repository });
  const response = await createVehicleUseCase.execute(params);
  return response.data;
};

const updateVehicle = async (params: UpdateVehicleRequest): Promise<Vehicle> => {
  const repository = new KVVehicleRepository();
  const updateVehicleUseCase = new UpdateVehicleUseCase({ vehicleRepository: repository });
  const response = await updateVehicleUseCase.execute(params);
  return response.data;
}

const getVehicle = async (params: GetVehicleRequest): Promise<Vehicle | null> => {
  const repository = new KVVehicleRepository();
  const getVehicleUseCase = new GetVehicleUseCase({ vehicleRepository: repository });
  try {
    const response = await getVehicleUseCase.execute(params);
    return response.data;
  } catch (error) {
    return null;
  }
};

const getAllVehicles = async (): Promise<Vehicle[]> => {
  const repository = new KVVehicleRepository();
  const getAllVehiclesUseCase = new GetAllVehiclesUseCase({ vehicleRepository: repository });
  const response = await getAllVehiclesUseCase.execute();
  return response.data;
};

const deleteVehicle = async (params: DeleteVehicleRequest): Promise<void> => {
  const repository = new KVVehicleRepository();
  const deleteVehicleUseCase = new DeleteVehicleUseCase({ vehicleRepository: repository });
  await deleteVehicleUseCase.execute(params);
};

const deleteAllVehicles = async (): Promise<void> => {
  const repository = new KVVehicleRepository();
  const deleteAllVehiclesUseCase = new DeleteAllVehiclesUseCase({ vehicleRepository: repository });
  await deleteAllVehiclesUseCase.execute();
};

const getVehicleInfo = async (params: GetVinDetailsRequest): Promise<any> => {
  const repository = new KVVinApiRepository();
  const getVinDetailsUseCase = new GetVinDetailsUseCase({ vinApiRepository: repository });
  try {
    const response = await getVinDetailsUseCase.execute(params);
    const results = response.data.Results[0];
    return results;
  } catch (error) {
    return null;
  }
}

export {
  createVehicle, deleteAllVehicles, deleteVehicle, getAllVehicles, getVehicle, getVehicleInfo, updateVehicle
};

