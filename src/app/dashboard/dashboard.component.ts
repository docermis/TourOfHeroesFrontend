import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from "../message.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    heroList: Hero[] = [];

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
                this.heroList = heroList.slice(0, 4);
                this.messageService.add('Hero Service: Heroes fetched.');
            },
          error => this.messageService.add( 'Hero Service: FAILED to fetch heroes.')
            );
    }

}
