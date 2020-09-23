import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { UserGuard } from './services/user.guard';
import { NoIdentityGuard } from './services/no.identity.guard';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'registro', canActivate: [NoIdentityGuard], component: RegisterComponent},
  {path: 'login', canActivate: [NoIdentityGuard], component: LoginComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'ajuste', canActivate: [UserGuard], component: UserEditComponent},
  {path: 'temas', component: TopicsComponent },
  {path: 'temas/:page', component: TopicsComponent},
  {path: 'tema/:id', component: TopicDetailComponent},
  {path: 'usuarios', component: UsersComponent},
  {path: 'perfil/:id', component: ProfileComponent},
  {path: 'buscar/:search', component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
