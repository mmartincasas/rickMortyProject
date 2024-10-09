import { Component } from '@angular/core';
import { CharactersListComponent } from "../characters-list/characters-list.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CharactersListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
