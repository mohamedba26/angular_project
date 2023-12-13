import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Auteur } from '../auteur';
import { AuteurService } from '../auteur.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() auteurId: object; // Assuming you pass the auteurId as an input
  @ViewChild('myModal') myModal!: ElementRef;
  display = 'none';
  auteur: Auteur = new Auteur(); // Adjust the type according to your Auteur model

  constructor(private auteurService: AuteurService) {}

  ngOnInit() {
    this.loadAuteur();
  }

  loadAuteur() {
    this.auteurService.getAuteurByID(this.auteurId).subscribe(
      (data) => {
        console.log(data); // Log the response to the console
        this.auteur = data;
      },
      (error) => console.log(error)
    );
  }
  openModal() {
    this.display = 'block';
  }

  closeModal() {
    this.display = 'none';
  }
}