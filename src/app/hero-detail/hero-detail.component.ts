import { Component, OnInit, Input } from '@angular/core';

import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router';


import { HeroService } from '../hero.service';
import { MessageService } from "../message.service";


@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    @Input() hero: Hero;

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.heroService.getHero(id)
            .subscribe(hero => {
                this.hero = hero;
                if (this.hero.id == 0) {
                    this.messageService.add(`Hero Service: Hero id = "${id}" not found.`);
                }
                else {
                    this.messageService.add(`Hero Service: Hero "${this.hero.name}" fetched.`);
                }
            },
            error => this.messageService.add(`Hero Service: Hero "${this.hero.name}" FAILED to fetch.`)
            );
    }

    save(): void {
        this.heroService.updateHero(this.hero)
            .subscribe(() => this.heroService.goBack());
    }

    goBack(): void {
        this.heroService.goBack();
        //this.location.go('http://localhost:60525/api/detail/' + id);
    }

}
