import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-nkpd-count-list',
  templateUrl: './nkpd-count-list.component.html',
  styles: []
})
export class NkpdCountListComponent {
  @Input()
  set inputArray(inputArrayArg: FormArray) {

    this.formArray = inputArrayArg;
  }

  public formArray: FormArray;

  constructor(
    private builder: FormBuilder
  ) {

  }

  public addRow() {
    const newGroup = this.builder.group({
      nkpd: [''],
      count: ['']
    });

    this.formArray.push(newGroup);
  }

  public removeRow(rowIndex: number) {
    this.formArray.removeAt(rowIndex);
  }
}
