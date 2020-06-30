import { Component, OnInit } from '@angular/core';
import { OpenPositionPOO } from './model/open-position-poo.model';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../../shared/services/reports.service';

@Component({
  selector: 'app-open-positions-report',
  templateUrl: './open-positions-report.component.html',
  styleUrls: ['./open-positions-report.component.scss']
})
export class OpenPositionsReportComponent implements OnInit {
  public openPositions: OpenPositionPOO[];

  constructor(
    private route: ActivatedRoute,
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.reportsService.getOpenPositions().subscribe(result => {
        this.openPositions = result;
      });
    });
  }

}
