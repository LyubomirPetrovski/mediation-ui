import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OpenPosition, EducationEnum } from '../model/company.dto';

@Component({
  selector: 'app-open-positions',
  templateUrl: './open-positions.component.html',
  styleUrls: ['open-positions.component.scss']
})
export class OpenPositionsComponent implements OnInit {
  @Input()
  set inputForm(inputFormArg: FormGroup) {
    inputFormArg.addControl('opemPositions', new FormControl());

    this.form = inputFormArg;
  }

  @Input() openPositions: OpenPosition[];
  @Output() addOpenPosition = new EventEmitter();

  public form: FormGroup;

  public EducationEnum: typeof EducationEnum = EducationEnum;
  public educations = [
    'Средно образование',
    'Висше образование'
  ];


  constructor() { }

  ngOnInit() {
  }

  public onAddOpenPositionClick() {
    this.addOpenPosition.emit();
  }
}
