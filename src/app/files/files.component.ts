import { Component, OnInit, ViewChild } from '@angular/core';

import { FileInfo } from '../file-info';

import { HeroService } from "../hero.service";
import { MessageService } from '../message.service';



@Component( {
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
} )
export class FilesComponent implements OnInit {
  private searchTerm: string;
  fileList: File[];
  fileNamesList: string[];

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  searchFiles() {
    this.heroService.searchFiles( this.searchTerm )
      .subscribe( result => {
        this.fileNamesList = result;
        if ( this.fileNamesList.length ) {
          this.messageService.add( `Hero Service: Found files with search term: ${this.searchTerm}` );
        }
        else {
          this.messageService.add( `Hero Service: Did NOT find files with search term: ${this.searchTerm}` );
        }
      },
      error => {
        this.messageService.add( 'Hero Service: FAILED to find files.' );
      } );
  }
}
