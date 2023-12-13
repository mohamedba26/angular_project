import { Component, Input } from '@angular/core';
import { Editeur } from '../editeur';
import { EditeurService } from '../editeur.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  @Input() editeurId: object; // Assuming you want to pass the editeurId from a parent component
  editeur: Editeur;
  display: string;

  constructor(private editeurService: EditeurService) { }

  ngOnInit(): void {
    this.loadEditeur();
  }

  loadEditeur() {
    this.editeurService.find(this.editeurId).subscribe((data) => {
      this.editeur = data;
    });
  }
  openModal() {
    this.display = 'block';
  }
  closeModal() {
    this.display = 'none';
  }
}
