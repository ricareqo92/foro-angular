import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Registrate';
    this.user = new User('', '', '', '', '', '', 'ROLE_USER');
    
  }

  ngOnInit() {
  }

  onSubmit(registerForm) {
    console.log(registerForm);
    this._userService.register(this.user).subscribe(
      response => {
        if ( response.user && response.user._id) {
          this.status = 'success';
          console.log(response); 
        } else {
          this.status = 'error';
        }
        registerForm.reset();
      },
      error => {
        console.log(error);
      }
    )
  }
}
