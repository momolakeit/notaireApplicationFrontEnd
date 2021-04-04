import { RendezVousDTO } from './../../model/rendez-vous-dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rendez-vous-preview',
  templateUrl: './rendez-vous-preview.component.html',
  styleUrls: ['./rendez-vous-preview.component.css']
})
export class RendezVousPreviewComponent implements OnInit {

  constructor() { }

  @Input() rendezVousDTO: RendezVousDTO;
  dateDebut: string;
  dateFin: string;

  ngOnInit(): void {
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.dateDebut = new Date(this.rendezVousDTO.dateDebut).toLocaleString();
    this.dateFin = new Date(this.rendezVousDTO.dateFin).toLocaleString();
  }

}
