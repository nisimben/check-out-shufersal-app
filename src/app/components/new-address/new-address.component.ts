import { Component, OnInit, signal ,inject, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { AddressService } from '../../services/address.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../core/interfaces/adress.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-address',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAddressComponent implements OnInit {
  @Output() addressAdded = new EventEmitter<any>();
  countryList = signal<string[]>([]); 
  newAddress = signal<Address>({});
  addressService: AddressService = inject(AddressService); 
  private readonly fb = inject(FormBuilder);
  addressForm = this.fb.group({
    country: ['',Validators.required],
    addressLine1: ['',Validators.required],
    addressLine2: [''],
    city: ['',Validators.required],
    zipCode: ['',Validators.required],
    saved: [false,Validators.required],
  })
  constructor() { }
  ngOnInit(): void {
    this.getCountries();
  }


  getCountries(): void {
    this.addressService.getCountries().subscribe({
      next: (data: string[]) => {
        this.countryList.set(data); // Set the signal
      },
      error: (err) => console.error('Error fetching countries:', err),
    });
  }

  addAddress(): void {
    if (this.addressForm.valid) {
      const newAddress: Address = {
        ...this.addressForm.value,
        saved: true,
      };
      this.addressService.addNewAddress(newAddress);
      this.addressForm.reset();
    }
  }

}
