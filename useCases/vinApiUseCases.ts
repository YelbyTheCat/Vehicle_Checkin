import { VinApiRepository } from "@/repositories/vinApiRepository";
import { UseCase } from "./usecases";

type GetVinDetailsRequest = {
  vin: string;
};

type GetVinDetailsResponse = {
  data: any;
};

class GetVinDetailsUseCase extends UseCase<GetVinDetailsRequest, GetVinDetailsResponse> {
  private vinApiRepository: VinApiRepository;
  constructor({vinApiRepository}: {vinApiRepository: VinApiRepository}) {
    super();
    this.vinApiRepository = vinApiRepository;
  }

  async execute(request: GetVinDetailsRequest): Promise<GetVinDetailsResponse> {
    const vehicle = await this.vinApiRepository.get(request.vin);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return { data: vehicle };
  }
}

export { GetVinDetailsUseCase, type GetVinDetailsRequest };
