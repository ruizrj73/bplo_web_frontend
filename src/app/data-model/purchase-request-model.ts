// ignore_for_file: unnecessary_new, prefer_collection_literals

import { PurchaseRequestIssuanceItemsModel } from "./purchase-request-issuance-items-model";
import { PurchaseRequestItemsModel } from "./purchase-request-items-model";

export class PurchaseRequestModel {
  constructor(
    public id: string,
    public prType: string,
    public prNo: string,
    public prDate: Date,
    public prQtr: string,
    public title: string,
    public departmentId: string,
    public departmentName: string,
    public sectionId: number,
    public sectionName: string,
    public alobsNo: string,
    public alobsDate: Date,
    public saiNo: string,
    public saiDate: Date,
    public transactionNo: string,
    public transactionDate: Date,
    public ppId: string,
    public ppNo: string,
    public sourceOfFund: string,
    public rationale: string,
    public procurementMode: string,
    public entryByDepartment: string,
    public entryByUser: string,
    public requestedByName: string,
    public requestedByPosition: string,
    public cashAvailabilityName: string,
    public cashAvailabilityPosition: string,
    public approvedByName: string,
    public approvedByPosition: string,
    public status: string,
    public items: PurchaseRequestItemsModel[],
    public forDBM?: boolean,
    public isLocked?: boolean,
    public issuanceItems?: PurchaseRequestIssuanceItemsModel[],
  ) {
    return {
      id,
      prType,
      prNo,
      prDate,
      prQtr,
      title,
      departmentId,
      departmentName,
      sectionId,
      sectionName,
      alobsNo,
      alobsDate,
      saiNo,
      saiDate,
      transactionNo,
      transactionDate,
      ppId,
      ppNo,
      sourceOfFund,
      rationale,
      procurementMode,
      entryByDepartment,
      entryByUser,
      requestedByName,
      requestedByPosition,
      cashAvailabilityName,
      cashAvailabilityPosition,
      approvedByName,
      approvedByPosition,
      status,
      forDBM,
      items,
      issuanceItems,
    }
  }
}