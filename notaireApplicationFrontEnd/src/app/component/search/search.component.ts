import { UserService } from './../../service/user.service';
import { UserSearchQueryDTO } from './../../model/request/user-search-query-dto';
import { UserDTO } from './../../model/user-dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private userService:UserService) { }
  userList:[UserDTO];

  userSeachQueryDTO:UserSearchQueryDTO={query:""};

  ngOnInit(): void {
  }

  searchUsers():void{
    this.userService.search(this.userSeachQueryDTO).subscribe((data)=>{
      console.log(data);
      this.userList = data;
    })
  }

  

}
