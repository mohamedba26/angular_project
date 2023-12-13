// cards.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Livre } from 'src/app/livre/livre';
import { LivreService } from 'src/app/livre/livre.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Output() productAdded = new EventEmitter<{ livre: Livre, quantity: number }>();
 addLivreToCart(livre: Livre) {
    this.productAdded.emit({ livre: livre, quantity: 1 });
  }

  products: Livre[] = [];
  productOrders : any[]= [];

  constructor(private livreService: LivreService) {}

  ngOnInit() {
    this.loadLivres();
  }

  loadLivres() {
    this.livreService.getAll().subscribe({
      next: (livres: any) => {
        this.products = livres;
        this.productOrders = this.products.map((livre) => ({ livre: livre, quantity: 0 }));
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  
  
  
}
