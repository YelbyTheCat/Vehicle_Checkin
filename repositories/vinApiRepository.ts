abstract class VinApiRepository {

  // Get details by VIN from external API
  abstract get(vin: string): Promise<any>;

}

class KVVinApiRepository extends VinApiRepository {

  async get(vin: string): Promise<any> {
    if (!vin) return Promise.reject("No VIN provided");
    const vehicleData = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`);
    if (!vehicleData.ok) {
      return Promise.reject("Failed to fetch vehicle data");
    }
    const data = await vehicleData.json();
    return data;
  }
}

export { KVVinApiRepository, VinApiRepository };
