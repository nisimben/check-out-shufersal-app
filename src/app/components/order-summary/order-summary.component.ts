import { ChangeDetectionStrategy, Component, inject, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../core/interfaces/cartItem.iterface';
import { AddressService } from '../../services/address.service';
@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./order-summary.component.html',
  styleUrl:'./order-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent {
  addressService = inject(AddressService);
constructor() {}
@Input() cartItems!: Signal<CartItem[]>;
@Input() totalAmount!: Signal<number>;

 
get selectedAddress() {
  return this.addressService.selectedAddress()?.addressLine1;
}
}
