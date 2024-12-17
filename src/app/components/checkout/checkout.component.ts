import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderSummaryComponent } from "../order-summary/order-summary.component";
import { CartItem } from '../../core/interfaces/cartItem.iterface';
import {MatInputModule} from '@angular/material/input';
import { BookAddressComponent } from "../book-address/book-address.component";


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OrderSummaryComponent, MatInputModule, BookAddressComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CheckoutComponent {
  
  constructor() {}

  ngOnInit(): void {

  }
  addressesList = signal<any[]>([]);

  // The method that will add a new address to the list
  updateAddressList(newAddress: any): void {
    // Update the signal by spreading the current list and adding the new address
    this.addressesList.update((addresses) => [...addresses, newAddress]);
  }

  // Example of adding a new address manually
  addNewAddress(address: any): void {
    this.updateAddressList(address);
  }



  cartItems = signal<CartItem[]>([
    { name: 'Product 1', quantity: 2, price: 29.99 },
    { name: 'Product 2', quantity: 1, price: 49.99 },
    { name: 'Product 3', quantity: 3, price: 15.99 },
  ]);

  totalAmount = signal<number>(
    this.cartItems().reduce((sum, item) => sum + item.quantity * item.price, 0)
  );

}