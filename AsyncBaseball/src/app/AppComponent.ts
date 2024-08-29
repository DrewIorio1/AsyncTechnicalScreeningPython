/**
 *  App Compents 
 */
import { Component, OnInit } from '@angular/core';

// Support Dialog pop-up for input
import { DialogService } from './dialog.service';

import { BaseballService } from './baseball.service';
import { Player } from './player.model';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    // initialize players to provident any binding erros error
    players: any[] = [];

    /**
     *
     * @param baseballService - Bindable baseball service for client or server
     * @param dialogService   - Dialog used for pop us
     */
    constructor(private baseballService: BaseballService, private dialogService: DialogService) { }

    // initial control with binding of player data
    ngOnInit() {
        this.baseballService.getPlayers().subscribe(data => {
            this.players = data;
        });
    }

    /**
     *
     * @param player - The player that will be shown
     */
    showDescription(player: Player) {

        this.dialogService.open(player, false);
    }

    /**
     *
     * @param player - The player that will be edited
     */
    editPlayer(player: Player) {

        //this.dialogService.open(player, true );
      this.dialogService.open(player, true);
      this.dialogService.saveComplete.subscribe((save)=> {
        console.log('Data received:');
        this.baseballService.updatePlayer(save.id, save);

        const player = this.players.find(p => p.id === save.id);
        if (player) {
          // Make sure to find the player
          Object.assign(player, save);

        }

      });
    }
}
