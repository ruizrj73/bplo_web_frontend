export class BusinessAddressInfoModel {
  constructor(
    public id: string,
    public region: string,
    public province: string,
    public city_municipality: string,
    public barangay: string,
    public zip_code: string,
    public house_bldg_no: string,
    public building_name: string,
    public lot_unit_no: string,
    public block_floor_no: string,
    public street: string,
    public subdivision: string,
    public remarks: string,
  ) {
    return {
      id,
      region,
      province,
      city_municipality,
      barangay,
      zip_code,
      house_bldg_no,
      building_name,
      lot_unit_no,
      block_floor_no,
      street,
      subdivision,
      remarks,
    }
  }
}