import { RendezVousService } from './../../service/rendez-vous.service';
import { RendezVousDTO } from './../../model/rendez-vous-dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rendez-vous-preview',
  templateUrl: './rendez-vous-preview.component.html',
  styleUrls: ['./rendez-vous-preview.component.css']
})
export class RendezVousPreviewComponent implements OnInit {

  constructor(private rendezVousService:RendezVousService) { }

  @Input() rendezVousDTO: RendezVousDTO;
  dateDebut: string;
  dateFin: string;

  ngOnInit(): void {
    console.log(this.rendezVousDTO.id)
    this.dateDebut = this.rendezVousService.dateToLocalString(this.rendezVousDTO.dateDebut);
    this.dateFin = this.rendezVousService.dateToLocalString(this.rendezVousDTO.dateFin);
  }

}
