import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: './autocomplete-display-example',
  templateUrl: './autocomplete-display-example.html',
})
export class AppComponent {
  controlInput = new FormControl('');
  options = [{ nom: 'Italie' }, { nom: 'France' }, { nom: 'Espagne' }];

  filteredOptions: Observable<{ nom: string }[]> =
    this.controlInput.valueChanges.pipe(
      startWith(''),
      map((value: any) => {
        const nom = typeof value === 'string' ? value : value?.nom;
        return nom ? this.filtrer(nom as string) : this.options.slice();
      })
    );

  public filtrer(input: string) {
    return this.options.filter((option) =>
      option.nom.toLowerCase().includes(input.toLowerCase())
    );
  }

  public fonctionAffichage(option: any): string {
    return option ? option.nom : option;
  }
}
