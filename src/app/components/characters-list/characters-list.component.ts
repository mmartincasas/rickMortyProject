import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Characters, CharactersList } from '../../interfaces/characters';


@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss'
})
export class CharactersListComponent {

  arrCharacters: Characters [] = [];

  charactersService = inject(CharactersService);

  ngOnInit(){

    this.charactersService.getAll().subscribe((data: CharactersList) => {
      this.arrCharacters = data.results;

      console.log(this.arrCharacters);

    })



  }

}
