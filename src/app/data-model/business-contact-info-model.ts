export class BusinessContactInfoModel {
  constructor(
    public id: string,
    public mobile_number: string,
    public tel_fax_number: string,
    public email_address: string,
    public remarks: string,
  ) {
    return {
      id,
      mobile_number,
      tel_fax_number,
      email_address,
      remarks,
    }
  }
}