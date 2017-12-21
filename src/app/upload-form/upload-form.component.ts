import { Component, ViewChild } from '@angular/core';

import { FileInfo } from '../file-info';

import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';


@Component( {
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
} )
export class UploadFormComponent {

  @ViewChild( "fileInput" ) fileInput;
  @ViewChild( "uploadForm" ) uploadForm;

  fileInfo = new FileInfo( "", "", "Bob's File", "Bob the Builder", "This is a file uploaded by Bob." );
  success = false;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  upload(): void {
    var fi = this.fileInput.nativeElement;
    if ( fi.files && fi.files[0] ) {
      var fileToUpload = fi.files[0];
      this.heroService.uploadFile( fileToUpload )
        .subscribe( result => {
          this.messageService.add( `Hero Service: Successfully uploaded "${fileToUpload.name}".` );
          this.success = true;
          this.fileInfo.xmlFileName = result.xmlFileName;
          this.fileInfo.originalFileName = fileToUpload.name;
          if ( this.success ) {
            this.heroService.updateXmlFile( this.fileInfo )
              .subscribe( result => {
                this.messageService.add( `Hero Service: Successfully created and filled "${fileToUpload.name}" 's xml file.` );
                this.uploadForm.reset();
                this.fileInput.nativeElement.value = "";
              },
              error => {
                this.messageService.add( `Hero Service: FAILED to update "${fileToUpload.name}" 's xml file.` );
              } );
          }
        },
        error => {
          this.messageService.add( 'Hero Service: FAILED to upload file.' )
        } );

    }
    
  }

}
