import { Router } from '@angular/router';
import { UserDTO } from './../../model/user-dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sneak-peak',
  templateUrl: './user-sneak-peak.component.html',
  styleUrls: ['./user-sneak-peak.component.css']
})
export class UserSneakPeakComponent implements OnInit {

  constructor(private router: Router) { }


  @Input() userDTO: UserDTO
  ngOnInit(): void {
  }
  checkOutUser():void{
    this.router.navigate(['/user', this.userDTO.id])
  }

}
