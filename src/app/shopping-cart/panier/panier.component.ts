// panier.component.ts

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { EcommService } from '../ecomm.service';
import jsPDF from 'jspdf';
import { Livre } from 'src/app/livre/livre';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;
  @Input() productAdded: any;
  total = 0;
  addTotal(prix: number, qte: number) {
    this.total=0;
    console.log(this.productAdded)
    this.productAdded.map((order: any)=>this.total+=order.livre.prix*order.quantity)
  }

  @Output() onOrderFinished = new EventEmitter();
  paymentHandler: any = null;
  stripeAPIKey: any =
    'pk_test_51KtYRUD3HS4vNAwatvmqAEXLKKX11UOcpkHfLnw9UPI9kZ7AJCOeLkqik61wHFXLmRGHUd4aNBvp45v82DpskKl300bMfznwlE';

  constructor(private ecommService: EcommService) { }

  ngOnInit() {
    this.invokeStripe();
  }

  checkoutProduct() {
    this.makePayment();
    this.total=0;
    this.productAdded={}
    console.log(this.productAdded)
  }
 // Update the type based on your data structure

  // Function to update selectedLivre


  makePayment() {
    let amount = this.total;

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: (stripeToken: any) => {
        this.processPayment(amount, stripeToken);
      },
    });

    paymentHandler.open({
      name: 'ItSolutionStuff.com',
      description: '3 widgets',
      amount: amount * 100,
    });
  }

  processPayment(amount: number, stripeToken: any) {
    console.log(stripeToken);

    const data = {
      amount: amount * 100,
      token: stripeToken
    };

    this.ecommService.sendPayment(data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          alert('Operation successfully done');
          this.onOrderFinished.emit(false);
          this.total = 0;
        },
        error: (e) => {
          console.log(e);
          alert('Error: Operation not done');
        },
      });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
            alert('Payment has been successful!');
            this.onOrderFinished.emit(false);
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
}
