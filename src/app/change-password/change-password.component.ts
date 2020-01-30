import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { first, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MustMatch } from '../shared/validators/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: []
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.form.controls; }

  public onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const currentUser = this.authService.getCurrentUser();

    this.loading = true;
    this.authService.changePassword(currentUser.id, this.f.password.value)
      .pipe(
        first(),
        finalize(() => this.loading = false))
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error;
        }
      );
  }
}
