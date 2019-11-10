import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styles: []
})
export class OpenPositionsComponent implements OnInit {
  @Input()
  set inputForm(inputFormArg: FormGroup) {
    this.form = inputFormArg;
  }

  public form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
