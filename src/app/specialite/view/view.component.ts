import { Component, Input, OnInit } from '@angular/core';
import { Specialite } from '../specialite';
import { SpecialiteService } from '../specialite.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() specialiteId: object;
  specialite: Specialite;
  display: string;

  constructor(private specialiteService: SpecialiteService) {}

  ngOnInit() {
    this.loadSpecialite();
  }

  loadSpecialite() {
    this.specialiteService.find(this.specialiteId).subscribe((data) => {
      this.specialite = data;
    });
  }
  openModal() {
    this.display = 'block';
  }
  closeModal() {
    this.display = 'none';
  }
}
