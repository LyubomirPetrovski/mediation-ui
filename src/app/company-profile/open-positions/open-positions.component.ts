import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OpenPosition, EducationEnum } from '../model/company.dto';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styles: []
})
export class OpenPositionsComponent implements OnInit {
  @Input()
  set inputForm(inputFormArg: FormGroup) {
    inputFormArg.addControl('opemPositions', new FormControl());

    this.form = inputFormArg;
  }

  @Input() openPositions: OpenPosition[];

  public form: FormGroup;

  public EducationEnum: typeof EducationEnum = EducationEnum;
  public educations = [
    'Средно образование',
    'Висше образование'
  ];


  constructor() { }

  ngOnInit() {
  }

}
