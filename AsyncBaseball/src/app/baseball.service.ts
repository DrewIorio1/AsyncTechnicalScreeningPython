// src/app/baseball.service.ts
/**
 * 
 *  Class - Main interface between service for players api and angular client
 *  
 *  Injections - Http Client is needed to call service
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player.model'


/**
 *
 *  BaseballService - Calling service to the api for the angular class
 *
 *  Assumptions -  http://localhost:55844/api/players will be running at the time the getplayers(), getplayer, updateplayer is called
 */
@Injectable({
  providedIn: 'root'
})
export class BaseballService {
  // Main url that is being called for builing class 
  private apiUrl = 'http://localhost:55844/api/players';

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.apiUrl);
  }

  getPlayer(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updatePlayer(id: number, playerData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, playerData);
  }
}
