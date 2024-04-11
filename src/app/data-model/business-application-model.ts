import { BusinessAddressInfoModel } from "./business-address-info-model";
import { BusinessAttachmentModel } from "./business-attachment-model";
import { BusinessContactInfoModel } from "./business-contact-info-model";
import { BusinessOperationInfoModel } from "./business-operation-info-model";
import { BusinessOwnerAddressInfoModel } from "./business-owner-address-model";
import { BusinessOwnerInfoModel } from "./business-owner-info-model";
import { LineOfBusinessMeasurePaxModel } from "./line-of-business-measure-pax-model";
import { LineOfBusinessModel } from "./line-of-business-model";

export class BusinessApplicationModel {
  constructor(
    public id: string,
    public transaction_no: string,
    public user_id: string,
    public user_name: string,
    public application_type: string,
    public payment_type: string,
    public tax_year: string,
    public organization_type: string,
    public business_name: string,
    public trade_name: string,
    public tin_no: string,
    public dtiseccda_registration_date: string,
    public dtiseccda_registration_no: string,
    public remarks: string,
    public application_status: string,
    public attachment: BusinessAttachmentModel[],
    public business_owner_info: BusinessOwnerInfoModel[],
    public business_contact_info: BusinessContactInfoModel[],
    public business_address_info: BusinessAddressInfoModel[],
    public business_owner_address_info: BusinessOwnerAddressInfoModel[],
    public business_operation_info: BusinessOperationInfoModel,
    public line_of_business: LineOfBusinessModel[],
    public line_of_business_measure_pax: LineOfBusinessMeasurePaxModel[],
  ) {
    return {
      id,
      transaction_no,
      user_id,
      user_name,
      application_type,
      payment_type,
      tax_year,
      organization_type,
      business_name,
      trade_name,
      tin_no,
      dtiseccda_registration_date,
      dtiseccda_registration_no,
      remarks,
      application_status,
      attachment,
      business_owner_info,
      business_contact_info,
      business_address_info,
      business_owner_address_info,
      business_operation_info,
      line_of_business,
      line_of_business_measure_pax,
    }
  }
}