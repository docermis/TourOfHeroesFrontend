import { Component, OnInit, ViewChild } from '@angular/core';

import { FileInfo } from '../file-info';
import { FileData } from '../file-data';


import { HeroService } from "../hero.service";
import { MessageService } from '../message.service';



@Component( {
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
} )
export class FilesComponent implements OnInit {
  private searchTerm: string;
  fileDataList: FileData[];
  fileData: FileData;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  searchFiles() {
    this.heroService.searchFiles( this.searchTerm )
      .subscribe( result => {
        this.fileDataList = result;
        if ( this.fileDataList.length ) {
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

  deleteFile( fileData: FileData ): void {
    this.heroService.deleteFile( fileData )
      .subscribe( result => {
        this.messageService.add( `Hero Service: File "${fileData.originalFileName}" deleted.` )
        this.searchFiles();
      },
      error => {
        this.messageService.add( `Hero Service: FAILED to delete file "${fileData.originalFileName}".` )
      }
      );
  }

}
