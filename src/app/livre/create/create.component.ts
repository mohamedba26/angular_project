import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Livre } from '../livre';
import { Specialite } from 'src/app/specialite/specialite';
import { Auteur } from 'src/app/auteur/auteur';
import { Editeur } from 'src/app/editeur/editeur';
import { AuteurService } from 'src/app/auteur/auteur.service';
import { EditeurService } from 'src/app/editeur/editeur.service';
import { SpecialiteService } from 'src/app/specialite/specialite.service';
import { LivreService } from '../livre.service';
import { FilePondComponent } from 'ngx-filepond';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myPond') myPond: FilePondComponent;
  display = 'none';
  livres: Livre = new Livre();
  specialites!: Specialite[];
  maised!: Editeur[];
  auteurs: Auteur[]; 

  constructor(
    private livreService: LivreService,
    private auteurServ: AuteurService,
    private editeurServ: EditeurService,
    private specServ: SpecialiteService
  ) {

    
   }
 
  ngOnInit() {
    this.loadscategorie();
    this.loadMaison();
    this.loadspec();
  }
  

  loadscategorie() {
    this.auteurServ.getAll().subscribe(
      (data) => (this.auteurs= data),
      (error) => console.log(error)
    );
  }
  loadspec() {
    return (
      this.specServ.getAll().subscribe((data) => (this.specialites = data)),
      (error: any) => console.log(error)
    );
  }/*
  ajoutlivre = () => {
    
    this.livreService.create(this.livres).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  };*/
  loadMaison() {
    this.editeurServ.getAll().subscribe(
      (data) => {
        this.maised = data;
        console.log('Maised:', this.maised); // Log the response
      },
      (error) => console.log(error)
    );
  }
  
  ajoutliver = () => {
    // Assuming you have selected authors and assigned them to this.livres.auteurs
  
    this.livreService.create(this.livres).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  };
  openModal() {
    this.display = 'block';
  }
  closeModal() {
    this.display = 'none';
  }
  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      process: (fieldName: any, file: any, metadata: any, load: any, error: any,progress: any, abort: any) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Bibliotek');
        data.append('cloud_name', 'dcwj4uosc')
        data.append('public_id', file.name)
        this.livreService
          .uploadSignature(data)
          .subscribe({
            next: (res) => {
              this.livres.couverture = res.url;
              load(res);
            },
            error: (e) => {
              console.log(e);
              error(e);
              return () => {
                abort();
              };
            },
            complete: () => {
              console.log('done');
              return () => {
                abort();
              };
            }
          })
      },
      revert: (uniqueFileId: any, load: any, error: any) => {
        error('Error');
        load();

      },
    }
  }
}

