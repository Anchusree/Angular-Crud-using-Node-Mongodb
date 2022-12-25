import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.component.html',
  styleUrls: ['./student-crud.component.css']
})
export class StudentCrudComponent {

  EmployeeArray:any[]=[]
  isResultloaded = false;
  isUpdateFormActive = false

  name:string="";
  address:string="";
  phone:string="";
  currentEmployeeID:string='';

  constructor(private http: HttpClient){
    this.getAllEmployee()
  }

  getAllEmployee(){

    this.http.get("http://localhost:8000/user/getAll").subscribe((resultData:any)=>{
      console.log(resultData);
      this.EmployeeArray = resultData.data

    })
  }

  register(){
    let bodyData = {
      "name":this.name,
      "address":this.address,
      "phone":this.phone,
    }
    this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData:any)=>{
      console.log(resultData);
      alert("Employee registered successfully")
      this.name = '';
      this.address = '';
      this.phone = '';
      this.getAllEmployee()
    })
  }

  setUpdate(data:any){
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.currentEmployeeID = data._id
    console.log(this.currentEmployeeID)
    //alert(this.currentEmployeeID)

  }

  updateRecords(){
    
    let bodyData = {
      "name":this.name,
      "address":this.address,
      "phone":this.phone,
    }
    this.http.patch("http://localhost:8000/user/update"+"/"+this.currentEmployeeID,bodyData)
    .subscribe((resultData:any)=>{
      console.log(resultData);
      alert("Employee updated successfully")
      this.name = '';
      this.address = '';
      this.phone = '';
      this.getAllEmployee()
    })
  }

  save(){
    console.log(this.currentEmployeeID)
    if(this.currentEmployeeID == ''){
      this.register()
    }
    else{
      this.updateRecords()
    }
  }


  setDelete(data:any){
    console.log(this.currentEmployeeID)
    this.http.delete("http://localhost:8000/user/delete"+"/"+data._id)
    .subscribe((resultData:any)=>{
      console.log(resultData);
      alert("Employee deleted successfully")
      this.name = '';
      this.address = '';
      this.phone = '';
      this.getAllEmployee()
    })
  }




}
