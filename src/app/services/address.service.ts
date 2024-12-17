import { Injectable, signal, WritableSignal } from '@angular/core';
import { Address } from '../core/interfaces/adress.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private _addressesList = signal<Address[]>([]);
  selectedAddress: WritableSignal<Address | undefined> = signal<Address | undefined>(undefined);



  constructor(private http: HttpClient) {}
   get addressesList() {
    return this._addressesList.asReadonly();
  }
  removeFromListAddress(addressToRemove: Address): void {
    this.deleteAddress(addressToRemove).subscribe();
    this._addressesList.update((addresses) =>
      addresses.filter((address) => address !== addressToRemove)
  )
    if (addressToRemove.id === this.selectedAddress()?.id) {
      this.selectedAddress.set(undefined)
    }
    
  }
  addNewAddress(newAddress: any): void {
    this.addAddress(newAddress).subscribe({
      next: (response) => {
        console.log('Address added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding address:', error);
      },
    });
    this._addressesList.update((addresses) => [...addresses, newAddress]);
  }
   getAddresses(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization':`Bearer ${environment.apiKey}` });
    return this.http.get(`${environment.apiUrl}/api/address`, { headers });
  }
  getCountries(): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization':`Bearer ${environment.apiKey}` });
    return this.http.get(`${environment.apiUrl}/api/address/countries`, { headers });
  }

  // Add a new address
  addAddress(address: any): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization':`Bearer ${environment.apiKey}` });
    return this.http.post(`${environment.apiUrl}/api/address`, address, { headers });
  }
  loadAddresses(): void {
    this.getAddresses().subscribe((address) => this._addressesList.set(address));
  }
  setSelectedAddress(address: Address): void {
    this.selectedAddress.set(address);

    
  }
  //  private getHeaders(): HttpHeaders {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${environment.apiKey}`
  //   });
  // }
  //  fetchAddresses(): void {
  //   this.http.get<Address[]>(`${environment.apiUrl}/api/address`, { 
  //     headers: this.getHeaders() 
  //   }).pipe(
  //     tap(addresses => this.addresses.set(addresses)),
  //     catchError(this.handleError<Address[]>('fetchAddresses', [])),
      
  //   ).subscribe();
  // }
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }
  deleteAddress(address: Address): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization':`Bearer ${environment.apiKey}` }); 
    return this.http.delete(`${environment.apiUrl}/api/address/${address.id}`, { headers });
  }

}
