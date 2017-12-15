import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';

import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroList: Hero[];

    constructor(
        private heroService: HeroService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.getHeroes();
    }


    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroList => {
                this.heroList = heroList;
                this.messageService.add('Hero Service: Heroes fetched.');
            },
            error => this.messageService.add('Hero Service: FAILED to fetch heroes.')
            );
    }

    deleteHero(hero: Hero): void {
        this.heroService.deleteHero(hero)
            .subscribe(result => {
                this.messageService.add(`Hero Service: Hero "${hero.name}" deleted.`)
                this.getHeroes();
            },
            error => this.messageService.add(`Hero Service: Hero "${hero.name}" not deleted.`)
            );
    }

}
