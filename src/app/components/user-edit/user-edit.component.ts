import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public token;
  public afuConfig;
  public url: string;
  public status: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.page_title = 'Ajustes de usuario';
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    this.afuConfig = {
        multiple: false,
        formatsAllowed: ".jpg, .png, .jpeg, .gif",
        maxSize: "50",
        uploadAPI:  {
          url: this.url + 'upload-avatar',
          headers: {
            "Authorization" : this.token
          }
        },
        theme: "attachPin",
        hideProgressBar: false,
        hideResetBtn: true,
        hideSelectBtn: false,
        replaceTexts: {
          selectFileBtn: 'Select Files',
          resetBtn: 'Reset',
          uploadBtn: 'Upload',
          dragNDropBox: 'Drag N Drop',
          attachPinBtn: 'Sube tu foto...',
          afterUploadMsg_success: 'Successfully Uploaded !',
          afterUploadMsg_error: 'Upload Failed !'
        }
    };
  }

  ngOnInit() {
  }

  avatarUpload(data) {
    let dataObj = JSON.parse(data.response);
    this.user.image = dataObj.user.image;
    console.log(this.user);
  }

  onSubmit(editForm) {
    this._userService.update(this.user).subscribe(
      response => {
          if ( !response.user ) {
            this.status = 'error';
          } else {
            this.status = 'success';
            localStorage.setItem('identity', JSON.stringify(this.user));
          }
      },
      error => {
        console.log(error);
      }
    );
  }
}
