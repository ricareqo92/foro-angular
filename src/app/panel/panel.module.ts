import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { PanelRoutingModule } from './panel-routing.module';

// Componentes
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { UserService } from '../services/user.service';
import { UserGuard } from '../services/user.guard';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    PanelRoutingModule,
    MomentModule,
  ],
  exports: [
    MainComponent,
    ListComponent,
    AddComponent,
    EditComponent,
  ],
  providers: [
    UserService,
    UserGuard
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PanelModule { }
