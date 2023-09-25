import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','education','company','expereince','salary','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private openDialog:MatDialog, private employeeService:EmployeeService, private coreService:CoreService){}
  
  ngOnInit(): void {
    this.getEmployeeDetails();
  }


  openAddEditDialog(){
    const dialogRef=this.openDialog.open(AddEditEmployeeComponent);
    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res){
          this.getEmployeeDetails();
        }
      }

    })
  }

  openEditDialog(data:any){
    const dialogRef = this.openDialog.open(AddEditEmployeeComponent,{
      data
    });
    dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res){
          this.getEmployeeDetails();

        }
      }
    })
    
    
    
  }

  public getEmployeeDetails(){
    return this.employeeService.getEmployeeDetails().subscribe({
      next:(response)=>{
        console.log(response);
        this.dataSource=new MatTableDataSource(<any>response);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;

      },
      error:console.log
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployeeDetails(id:any){
    return this.employeeService.deleteEmployeeDetails(id).subscribe({
      next:(response)=>{
        
        this.coreService.openSnackBar('employee details delted')
        this.getEmployeeDetails();
        console.log(response);

      },
      error:console.log
    })
  }
}
