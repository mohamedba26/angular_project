import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { Livre } from '../livre';
import { Specialite } from 'src/app/specialite/specialite';
import { Auteur } from 'src/app/auteur/auteur';
import { Editeur } from 'src/app/editeur/editeur';
import { AuteurService } from 'src/app/auteur/auteur.service';
import { EditeurService } from 'src/app/editeur/editeur.service';
import { SpecialiteService } from 'src/app/specialite/specialite.service';
import { LivreService } from '../livre.service';
import { FilePondComponent } from 'ngx-filepond';
import { FilePondOptions } from 'filepond';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  @Input() livreId: object; // Assuming you pass the livreId as an input

  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myPond') myPond: FilePondComponent;
  display = 'none';
  livre: Livre = new Livre();
  specialites: Specialite[];
  auteurs: Auteur[];
  maised: Editeur[];

  constructor(
    private livreService: LivreService,
    private auteurServ: AuteurService,
    private editeurServ: EditeurService,
    private specServ: SpecialiteService
  ) {}

  ngOnInit() {
    this.loadscategorie();
    this.loadMaison();
    this.loadspec();
    this.loadLivre(); // Load the livre details when the component is initialized
    this.livreService.getAuteurByID(this.livre.auteursId).subscribe((data) => {
      this.auteurs = data;
    });
  }

  loadLivre() {
    this.livreService.find(this.livre).subscribe((data) => {
      this.livre = data;
      this.updatePondFiles();
    });
  }


  loadMaison() {
    this.editeurServ.getAll().subscribe(
      (data) => (this.maised = data),
      (error) => console.log(error)
    );
  }

  loadscategorie() {
    this.auteurServ.getAll().subscribe(
      (data) => (this.auteurs = data),
      (error) => console.log(error)
    );
  }

  loadspec() {
    this.specServ.getAll().subscribe(
      (data) => (this.specialites = data),
      (error) => console.log(error)
    );
  }

  update= () => {
    this.livreService.update(this.livre._id, this.livre).subscribe((data) => {
      console.log(data);
      this.closeModal();
      window.location.reload();
    });
  };

  openModal() {
    // Load the existing data of the selected livre
    this.livreService.find(this.livreId).subscribe((data) => {
      this.livre = data;
      this.updatePondFiles();
      this.display = 'block';
    });
  }
  closeModal() {
    this.display = 'none';
  }

  pondFiles: FilePondOptions['files'];

  updatePondFiles() {
    this.pondFiles = [
      {
        source: this.livre.couverture,
        options: {
          type: 'local',
        },
      },
    ];
  }

  pondOptions = {
    class: 'my-filepond',
    multiple: false,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png',
    server: {
      process: (
        fieldName: any,
        file: any,
        metadata: any,
        load: any,
        error: any,
        progress: any,
        abort: any
      ) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce_cloudinary');
        data.append('cloud_name', 'dcwj4uosc');
        data.append('public_id', file.name);

        this.livreService.uploadSignature(data).subscribe({
          next: (res) => {
            this.livre.couverture = res.url;
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
          },
        });
      },
      revert: (uniqueFileId: any, load: any, error: any) => {
        error('Error');
        load();
      },
    },
  };
}
