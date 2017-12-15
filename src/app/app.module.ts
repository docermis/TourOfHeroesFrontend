import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroFormComponent } from './hero-form/hero-form.component';


import { HeroService } from './hero.service';
import { MessageService } from './message.service';

import { AppRoutingModule } from './/app-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { UploadFormComponent } from './upload-form/upload-form.component';



@NgModule({
    declarations: [
        AppComponent,
        HeroesComponent,
        HeroDetailComponent,
        MessagesComponent,
        DashboardComponent,
        HeroFormComponent,
        HeroSearchComponent,
        UploadFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [HeroService, MessageService],
    bootstrap: [AppComponent]
})
export class AppModule { }
