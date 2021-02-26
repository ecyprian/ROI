import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {
  displayedColumns: string[] = ['username', 'customer[0].customerId', 'customer[0].customerName', 'opportunity[0].scenarioId', 'id'];
  dataSource;
  reportsData: boolean = false;
  selection;
  seletedRowModel: any = {};
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public dialogRef: MatDialogRef<ViewReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if (this.data.reports.length > 0) {
      this.reportsData = true;
    }
    this.dataSource = new MatTableDataSource(this.data.reports);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'customer[0].customerId': return item.customer[0].customerId;
        case 'customer[0].customerName': return item.customer[0].customerName;
        case 'opportunity[0].scenarioId': return item.opportunity[0].scenarioId;
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort
    this.selection = new SelectionModel(false, []);
  }
  selectedRow(id, status) {
    this.seletedRowModel.id = id;
    this.seletedRowModel.status = status;
  }
  //load report data with selected row id 
  loadReportData() {
    if (this.seletedRowModel !== undefined) {
      if (this.seletedRowModel.status === true) {
        this.dialogRef.close(this.seletedRowModel.id);
      }
    }
  }
  // direct load report on double click
  loadReportondbClick(id) {
    this.seletedRowModel.id = id;
    if (this.seletedRowModel !== undefined) {
      this.dialogRef.close(this.seletedRowModel.id);
    }
  }
  // typecasting timestamp to number
  StringToIntDate(stringtimestamp): Number {
    var numberTiemStamp = Number(stringtimestamp);
    return numberTiemStamp * 1000;
  }

  onClose(): void {
    this.dialogRef.close();
  }


}



