import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isRegExp } from 'util';
import { PurchaseRequestModel } from '../data-model/purchase-request-model';
import { UserModel } from '../data-model/user-model';
import { requestRoutes } from '../util/request_routes';
import { BusinessApplicationModel } from '../data-model/business-application-model';

var routes = new requestRoutes();

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  
  constructor(private http: HttpClient) { }

  isUserAvailable(username: string, password: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.userApi;
    url = url + "/login"
    var body = {
      "username": username,
      "password": password
    }
    return this.http.post(url, body);
  }

  getUsers(): Observable<any> {
    return this.http.get(routes.baseUrlBPLO + routes.userApi);
  }

  saveUser(data: UserModel): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.userApi;
    url = url + "/register";
    return this.http.post(url, data);
  }

  updateUser(id: string, data: UserModel): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.userApi;
    url = url + "/update/" + id;
    return this.http.patch(url, data);
  }

  deleteUser(id: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.userApi;
    url = url + "/" + id;
    return this.http.delete(url);
  }

  savePurchaseRequestAttachment(file: File): Observable<any> {
    var url: string = "https://api.cloudinary.com/v1_1/de42wowt2/Attachment/PR";
    var data = {
      context: 'image=' + file.name,
      file: file,
      withcredentials: false,
    };
    return this.http.post(url, data, {headers: {
      'Access-Control-Allow-Origin' : '*'
    }});
  }

  getAllBusinessApplicationByMonthYear(date: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.businessApplication;
    url = url + "/by-month-year/" + date;
    return this.http.get(url);
  }

  getAllBusinessApplicationByDateRange(dateFrom: string, dateTo: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.businessApplication;
    url = url + "/by-date-range/" + dateFrom + "/" + dateTo;
    return this.http.get(url);
  }

  getAllBusinessApplicationByQuarter(qtr: number, year: number): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.businessApplication;
    url = url + "/by-quarter/" + qtr.toString();
    url = url + "/" + year.toString();
    return this.http.get(url);
  }

  saveBusinessApplication(ba: BusinessApplicationModel): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.businessApplication;
    return this.http.post(url, ba);
  }

  updateBusinessApplication(id: string, pp: BusinessApplicationModel): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.businessApplication;
    url = url + "/" + id;
    return this.http.patch(url, pp);
  }

  updateBusinessStatus(id: string, status: string, message: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.businessApplication;
    url = url + "/applicationStatus/update";
    url = url + "?id=" + id;
    url = url + "&status=" + status;
    url = url + "&message=" + message;
    return this.http.patch(url, "");
  }
  
  

  savePurchaseRequest(pr: PurchaseRequestModel): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    return this.http.post(url, pr);
  }

  updatePurchaseRequest(id: string, pp: PurchaseRequestModel): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    url = url + "/" + id;
    return this.http.patch(url, pp);
  }

  getPurchaseRequestTransactionNo(): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    url = url + "/transactionNo/transNo";
    return this.http.get(url);
  }

  getPurchaseRequestTransactionCount(prId: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    url = url + "/transaction/count/" + prId;
    return this.http.get(url);
  }

  getPurchaseRequestConsoTransactionCount(prIds: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    url = url + "/consotransaction/count/" + prIds;
    return this.http.get(url);
  }

  getPurchaseRequestCalloutTransactionCount(prIds: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    url = url + "/callouttransaction/count/" + prIds;
    return this.http.get(url);
  }

  getAllPurchaseRequest(): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    return this.http.get(url);
  }

  getAllPurchaseRequestByMonthYear(date: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    url = url + "/byMonthYear/" + date;
    return this.http.get(url);
  }

  getAllPurchaseRequestForConsoByMonthYear(date: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.purchaseRequest;
    url = url + "/byMonthYear/forConso/" + date;
    return this.http.get(url);
  }

  // Employee for Signatory
  getEmployees(): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.listDepartmentApi;
    url = url + "/signatory/all";
    return this.http.get(url);
  }
  
  getDefaultSignatory(_deptId: string): Observable<any> {
    var url: string = routes.baseUrlBPLO + routes.listDepartmentApi;
    url = url + "/signatory/default/" + _deptId;
    return this.http.get(url);
  }
  
  // Test Only
  getBusinessApplication(): Observable<any> {
    var url: string = "http://143.198.91.135:9009/api/v1/business-application";
    return this.http.get(url);
  }
}
