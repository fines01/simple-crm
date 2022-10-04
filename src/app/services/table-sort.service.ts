import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class TableSortService {

  sortedData!: any[];

  constructor() { }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: any | Sort, unsortedData: any[], sortColumns:string[]): any[] {
    let data = unsortedData.slice();
    if (!sort.active || sort.direction === '') this.sortedData = unsortedData;
    else this.sortedData = this.sortTargetColumns(sort, data, sortColumns);
    return this.sortedData;
  }

  sortTargetColumns(sort: any | Sort, data:any[], sortColumns:string[]) {
    return data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      for(let col of sortColumns){
        if ((sort.active) === col) return this.compare(a[col],b[col], isAsc);
      }
      return 0;
    });
  }

}
