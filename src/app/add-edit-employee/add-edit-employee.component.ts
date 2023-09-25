import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit {
  empForm:FormGroup;
  education:string[]=[
    'Diploma',
    'Bachelors',
    'Masters',
    'PHd'
  ];
  constructor(private formBuilder:FormBuilder, private employeeService:EmployeeService, private dialogRef:MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private coreService:CoreService
    ){
    
    this.empForm = this.formBuilder.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      expereince:'',
      salary:''

    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this.employeeService.updateEmployeeDetails(this.data.id,this.empForm.value).subscribe({
          next:(response)=>{
  
            //alert('Employeee details updated successfully');
            this.coreService.openSnackBar('Employeee details updated successfully')
            this.employeeService.getEmployeeDetails();
            this.dialogRef.close(true);
  
          },
          error(err:any){
            console.error(err);
  
          }
        })

      }
      else{
        this.employeeService.postEmployeeDetails(this.empForm.value).subscribe({
          next:(response)=>{
  
            //alert('Employee added successfully');
            this.coreService.openSnackBar('Employee added successfully')
            this.employeeService.getEmployeeDetails();
            this.dialogRef.close(true);
  
          },
          error(err:any){
            console.error(err);
  
          }
        })

      }
      
    }
  }

}
