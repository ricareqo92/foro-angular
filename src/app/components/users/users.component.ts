import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { global } from '../../services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  public page_title;
  public users: User[];
  public url;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.url = global.url;
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if ( response.users ) {
          this.users = response.users;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
