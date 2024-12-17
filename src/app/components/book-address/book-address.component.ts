import { ChangeDetectionStrategy, Component, Input, OnInit, Signal, signal } from '@angular/core';
import { Address } from '../../core/interfaces/adress.interface';
import { AddressService } from '../../services/address.service';
import { CommonModule } from '@angular/common';
import { NewAddressComponent } from '../new-address/new-address.component';

@Component({
  selector: 'app-book-address',
  standalone: true,
  imports: [CommonModule,NewAddressComponent],
  templateUrl:'./book-address.component.html',
  styleUrl:'./book-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAddressComponent implements OnInit{
  addressesList: Signal<Address[]> = signal([]);
  selectedAddress: Address | null = null;
  isAddNewAddressVisible = false;
constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.loadAddresses();
    this.addressesList = this.addressService.addressesList;
  }
  toggleAddNewAddress(): void {
    this.isAddNewAddressVisible = !this.isAddNewAddressVisible;
  }
  selectAddress(address: Address): void {
    this.addressService.setSelectedAddress(address);
    if (this.isAddNewAddressVisible) {
      this.toggleAddNewAddress(); 
    }
    
  }
  deleteAddress(address: Address): void {
    this.addressService.removeFromListAddress(address);
  }
}
