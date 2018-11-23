import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Table } from '../../models/section-types';

@Component({
  selector: 'docu-table-form',
  template: `
    <table [formGroup]="form">
      <tbody>
        <tr>
          <td></td>
          <td *ngFor="let control of tableRows?.at(0).get('cols').controls; let i = index">
            <button type="button" (click)="removeCol(i)">-</button>
          </td>
          <td><button type="button" (click)="addCol()">+</button></td>
        </tr>

        <tr *ngFor="let row of tableRows?.controls; let i = index" [formGroup]="row.get('cols')">
          <td><button type="button" (click)="removeRow(i)">-</button></td>
          <td *ngFor="let col of row?.get('cols').controls; let j = index"><input [formControlName]="j"></td>
        </tr>

        <tr>
          <td><button type="button" (click)="addRow()">+</button></td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    :host { width: 100%; overflow-x: scroll; }
    table, tr, td { margin: 0; padding: 0; border: 0; outline: 0; }
    td { border: 1px solid #ccc; text-align: center; }
    button { background-color: none; border: none; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() table: Table;

  get tableRows(): FormArray {
    return this.form.get('table') as FormArray;
  }
  get numRows(): number { return this.tableRows.length; }
  get numCols(): number { return (<FormArray>this.tableRows.at(0).get('cols')).length; }

  ngOnInit() {
    this.patchTable();
  }

  patchTable() {
    console.log(this.table);
    this.form.setControl('table', new FormArray([]));
    if (this.table) {
      for (let i = 0; i < this.table.table.length; i++) {
        const row = this.table.table[i];
        this.tableRows.push(new FormGroup({ cols: new FormArray(this.createControlsArray(row)) } ));
        console.log(this.tableRows.getRawValue());
      }
    }
  }

  createControlsArray(items: any[]): FormControl[] {
    const controls = [];
    for (const item of items) {
      controls.push(new FormControl(item));
    }
    return controls;
  }

  addRow() {
    const controls = [];
    for (let i = 0; i < this.numCols; i++) {
      controls.push(new FormControl(''));
    }
    this.tableRows.push(new FormGroup({ cols: new FormArray(controls) }));
  }
  addCol() {
    for (const row of this.tableRows.controls) {
      (<FormArray>row.get('cols')).push(new FormControl(''));
    }
  }

  removeRow(index: number) {
    this.tableRows.removeAt(index);
  }
  removeCol(index: number) {
    for (const row of this.tableRows.controls) {
      (<FormArray>row.get('cols')).removeAt(index);
    }
  }
}
