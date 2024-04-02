export class BusinessOwnerInfoModel {
  constructor(
    public id: string,
    public first_name: string,
    public middle_name: string,
    public last_name: string,
    public suffix: string,
    public gender: string,
    public remarks: string,
  ) {
    return {
      id,
      first_name,
      middle_name,
      last_name,
      suffix,
      gender,
      remarks,
    }
  }
}