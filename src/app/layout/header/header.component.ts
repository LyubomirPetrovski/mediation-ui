import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  public currentUser: User;

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.currentUser = this.storageService.getItem('user');

    this.sub = this.storageService.watchStorage().subscribe(changedKey => {
      if (changedKey === 'user') {
        this.currentUser = this.storageService.getItem('user')
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
