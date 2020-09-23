import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {

    constructor(
        private _userService: UserService,
        private _router: Router
    ) {
    }
    canActivate() {
        let identity = this._userService.getIdentity();

        if ( identity && identity.name ) {
            return true;
        } else {
            this._router.navigate(['/']);
            return false;
        }
    }
}