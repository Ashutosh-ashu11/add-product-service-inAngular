import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-pojo',
  templateUrl: './dynamic-pojo.component.html',
  styleUrls: ['./dynamic-pojo.component.scss']
})
export class DynamicPojoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog) { }

  ngOnInit(): void {
  }

}
