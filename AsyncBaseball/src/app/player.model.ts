// src/app/player.model.ts
/**
 *
 *  Player.model.ts
 *
 *  Class - Data that comes from https://api.sampleapis.com/baseball/hitsSingleSeason
 *  
 *  Assumptions:
 * 
 *  All values for numberic values are assumed to be convertable
 */
export interface Player {
  Rank: number;
  Player: string;
  AgeThatYear: number;
  Hits: number;
  Year: number;
  Bats: string;
  id: number;
}
