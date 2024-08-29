// src/app/app.module.ts
/**
 *
 *  app.modlue - import of all the core actions together used while the angular app is running
 *
 *  App Specic code
 *  baseball.service        - code found in src\app\baseball.service.ts
 *  custom-dialog.component - code found in src\app\custom-dialog\custom-dialog.compent.ts
 *  
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';


import { AppComponent } from './AppComponent';
import { BaseballService } from './baseball.service';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // BrowserAnimationsModule,
 
    
    MatDialogModule
  ],
  providers: [BaseballService],
  bootstrap: [AppComponent]
})
export class AppModule { }
