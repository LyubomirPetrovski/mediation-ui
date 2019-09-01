import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styles: []
})
export class CompanyProfileComponent implements OnInit {
  public companyId: string;
  // public company: Company

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.companyId = params.get('companyId');

      
    });
  }

}
