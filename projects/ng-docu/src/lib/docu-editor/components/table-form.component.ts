import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Table } from '../../models/section-types';

@Component({
  selector: 'docu-table-form',
  template: `
    <table [formGroup]="form">
      <tbody>
        <tr>
          <td></td>
        </tr>

        <tr *ngFor="let row of rows; let i = index">
          <td><button (click)="removeRow(i)">-</button></td>
          <td><input></td>
        </tr>

        <tr>
          <td><button (click)="addRow()">+</button></td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    table, tr, td { margin: 0; padding: 0; border: 0; outline: 0; }
    td { border: 1px solid #ccc; }
    button { background-color: none; border: none; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() table: Table;

  ngOnInit() {

  }

  addRow() {}
  addColumn() {}

  removeRow(index: number) {}
}
