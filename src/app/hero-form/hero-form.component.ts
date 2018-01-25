import { Component, ViewChild } from '@angular/core';

import { Hero } from '../hero';

import { HeroService } from "../hero.service";
import { MessageService } from "../message.service";

@Component( {
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
} )
export class HeroFormComponent {

  @ViewChild( "fileInput" ) fileInput;

  hero = new Hero( undefined, 'Pacman', 'Eats candy and ghosts.', 'You know who he is.' );

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }



  submit(): void {
    this.heroService.getHeroByName( this.hero.name ) //den iparxei to id giati einai undefined kai prepei kapws na to pairnw apo to backend
      .subscribe( resultHero => {
        if ( resultHero.id != 0 ) {
          this.messageService.add( `Hero Service: Hero "${this.hero.name}" already exists.` );
        }
        else {
          this.heroService.submitHero( this.hero )
            .subscribe( resultHero => {
              this.hero = resultHero;
              this.messageService.add( `Hero Service: Hero "${this.hero.name}" added.` );
              this.heroService.goTo();
            },
            error => this.messageService.add( `Hero Service: Hero "${this.hero.name}" FAILED to add.` )
            );
        }
      },
      error => this.messageService.add( 'Hero Service: FAILED to find hero.' )
      );

  }

  goBack(): void {
    this.heroService.goBack();
  }
  
}


