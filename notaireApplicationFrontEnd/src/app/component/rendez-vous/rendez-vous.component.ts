import { RendezVousDTO } from 'src/app/model/rendez-vous-dto';
import { RendezVousService } from './../../service/rendez-vous.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private rendezVousService: RendezVousService) { }

  dateDebut: string;
  dateFin: string;
  rendezVous: RendezVousDTO;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let id = params.get("rendezVousId");
      this.rendezVousService.fetchRendezVousById(parseInt(id)).subscribe(data => {
        this.rendezVous = data
        this.initDates();
      });

    })
  }
  initDates(): void {
    this.dateDebut = this.rendezVousService.dateToLocalString(this.rendezVous.dateDebut);
    this.dateFin = this.rendezVousService.dateToLocalString(this.rendezVous.dateFin);
  }

}
