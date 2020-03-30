import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Item } from '../item';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-provider-item',
  templateUrl: './provider-item.component.html',
  styleUrls: ['./provider-item.component.css']
})
export class ProviderItemComponent implements OnInit, AfterViewInit {

  item:Item=new Item();
  constructor( public dialogRef: MatDialogRef<ProviderItemComponent>
    , private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }
  onNoClick(){
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close();
  }
}
