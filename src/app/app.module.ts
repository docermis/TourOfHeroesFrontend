import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { FilesComponent } from './files/files.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';




import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { AuthenticationService } from './authentication.service';

import { AppRoutingModule } from './/app-routing.module';
import { UserService } from './user.service';
import { AppConfig } from './app.config';
import { AuthGuard } from './auth.guard';




@NgModule( {
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroFormComponent,
    HeroSearchComponent,
    UploadFormComponent,
    FilesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HeroService,
    MessageService,
    AuthenticationService,
    UserService,
    AppConfig,
    AuthGuard
  ],
  bootstrap: [AppComponent]
} )
export class AppModule { }
