import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './AppComponent';
import { BaseballService } from './baseball.service';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';

@NgModule({
    declarations: [
        AppComponent//,
        //PlayerDialogComponent
    ],
    imports: [
        BrowserModule,
      HttpClientModule, FormsModule
        // BrowserAnimationsModule,
      //  MatDialogModule
    ],
    providers: [BaseballService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
