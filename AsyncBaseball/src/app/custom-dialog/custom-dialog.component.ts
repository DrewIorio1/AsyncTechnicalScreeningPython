// src/app/custom-dialog/custom-dialog.component.ts
/**
 * custom-dialog.compant - popup class to avoid binding errors during angular/material/dialog
 */


import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
//import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {
  @Input() data: any;
  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Player>();
  
  specialValue: any

  ngOnInit() {
    //TODO : Implement 2 way binding
  }

  /**
   *  Close the current user
   */
  onClose() {
    this.close.emit();
  }

  /**
   * 
   * @param Year - Year the player achived the rank
   * @param Age  - Age of the player 
   * @param Hits - Total number of hits for the player in a given year
   * @param Bats - If the player batted left or right handed
   */
  onSave(Year: string, Age: string, Hits: string, Bats : string): void {
    // Implement save functionality here
    //let year =  Number.parseInt(Year) ;
    const updatedPlayer: Player = {
        Player: this.data.Player,
        Rank: this.data.Rank,
      AgeThatYear: Number.parseInt(Age),
      Hits: Number.parseInt( Hits),
      Year: Number.parseInt(Year),
      Bats: Bats,
        id: this.data.id
    };
    this.save.emit(updatedPlayer);
    this.onClose();
  }
}
