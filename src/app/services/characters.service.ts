import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharactersList } from '../interfaces/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private url = "https://rickandmortyapi.com/api/character";

  httpClient = inject (HttpClient);

  getCharactersByName(name: string){
    return this.httpClient.get<CharactersList>(this.url + '/?name=' + name);
  }
  
  getMoreCharactersByUrl(url: string) {
    return this.httpClient.get<CharactersList>(url);
  }
  
}
