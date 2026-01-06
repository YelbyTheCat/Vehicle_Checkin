import { Vehicle } from "@/domain/vehicle";
import Storage from "expo-sqlite/kv-store";

abstract class VehicleRepository {

  // Create/Update a new vehicle

  abstract put(vehicle: Vehicle): Promise<Vehicle>;

  // Get a vehicle by ID
  abstract get(vin: string): Promise<Vehicle | null>;

  // Get all vehicles
  abstract getAll(): Promise<Vehicle[]>;
  
  // Delete a vehicle by ID
  abstract delete(vin: string): Promise<void>;

  // Mass Delete of vehicles
  abstract deleteAll(): Promise<void>;

}

// Key Value Vehicle Repository

class KVVehicleRepository extends VehicleRepository {
  async put(vehicle: Vehicle): Promise<Vehicle> {
    if (!vehicle) return Promise.reject("No vehicle provided");
    const vehicles = await this.getAll();
    const existingIndex = vehicles.findIndex(v => v.vin === vehicle.vin);
    if (existingIndex >= 0) {
      vehicles[existingIndex] = vehicle;
    } else {
      vehicles.push(vehicle);
    }
    await Storage.setItem(`vehicles`, JSON.stringify(vehicles));

    return vehicle;
  }

  async get(vin: string): Promise<Vehicle | null> {
    const vehicles = await this.getAll();
    const vehicle = vehicles.find(v => v.vin === vin);
    if (vehicle) {
      return vehicle;
    }
    return null;
  }

  async getAll(): Promise<Vehicle[]> {
    const vehiclesString = await Storage.getItem(`vehicles`);
    const vehicles: Vehicle[] = vehiclesString ? JSON.parse(vehiclesString) : [];
    return vehicles;
  }

  async delete(vin: string): Promise<void> {
    const vehicles = await this.getAll();
    const filteredVehicles = vehicles.filter(v => v.vin !== vin);
    await Storage.setItem(`vehicles`, JSON.stringify(filteredVehicles));
  }

  async deleteAll(): Promise<void> {
    await Storage.removeItem(`vehicles`);
  }
}

export {
  KVVehicleRepository, VehicleRepository
};
