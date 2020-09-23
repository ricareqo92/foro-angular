import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public status: string;
  public token: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.page_title = 'Identificate';
    this.user = new User('' ,'', '', '', '', '', 'ROLE_USER');
  
  }

  ngOnInit() {
  }

  onSubmit(loginForm) {
    //console.log(this.user);
    this._userService.signup(this.user).subscribe(
      response => {
        if ( response.user && response.user._id ) {
          // GUARDAMOS AL USUARIO EN UNA PROPIEDAD
          this.identity = response.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
          
          // CONSEGUIR EL TOKEN DEL USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(
            response => {
              if ( response.token ) {
                // GUARDAR EL TOKEN DEL USUARIO EN UNA PROPIEDAD
                this.token = response.token;
                localStorage.setItem('token', this.token);
                this._router.navigate(['/inicio']);
              }
            },
            error => {
              console.log(error);
            }
          );
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

}
