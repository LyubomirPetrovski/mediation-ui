import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-open-position-editor',
  templateUrl: './open-position-editor.component.html',
  styles: []
})
export class OpenPositionEditorComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private builder: FormBuilder
  ) {
    this.form = this.builder.group({
      nkpdControl: this.builder.group({
        nkpd: ['', Validators.required],
        count: ['', Validators.required]
      })
    });
  }

  ngOnInit() {
  }

}
