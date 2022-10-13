import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, ReplaySubject} from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  
  /* RxJs Subject: implement both the Observer and the Observable interfaces, (we can use them to both emit values via next() and register subscribers)
  But if w subscribe to a Subject we won't get the last value and have to wait until some part of the app calls next(). Solution: use BehaviorSubject
  RxJs BehaviorSubject: will return upon subscription the last value of the stream, or an initial state if no value was emitted yet */
  
  //
  allEmployees: any = [];
  allProjects: any = [];
  unassignedEmployees: any = [];
  emplojeeProjectJunctions: any = [];
  
  private unassigned = new  BehaviorSubject(this.unassignedEmployees);
  unassigned$ = this.unassigned.asObservable();
  //
  private employees = new BehaviorSubject(this.allEmployees)
  employees$: Observable<any> = this.employees.asObservable();
  //
  private projects = new BehaviorSubject(this.allProjects);
  projects$ = this.projects.asObservable();
  
  constructor(
    private fireService: FirestoreService,
  ) { 
    this.subscribeAllEmployees();
    this.subscribeAllProjects();
    this.subscribeEmployeeProjectJunctions();
  }
  
  sendUnassignedEmployeeData(data: any) {
    this.unassigned.next(data) // TEST: data received (but only when opened) from employee-details component...
  }

  subscribeAllEmployees(){
    this.fireService.getCollection('employees', 'lastName')
      .subscribe( (result)=> {
        if (result) this.allEmployees = result;
        this.employees.next(this.allEmployees);
      })
  }

  subscribeAllProjects() {
    this.fireService.getCollection('projects', 'name')
      .subscribe( (result)=> {
        if (result) this.allProjects = result;
      });
  }

  subscribeEmployeeProjectJunctions() {
    this.fireService.getCollection('employee_project')
      .subscribe( (result) => {
        if (result) this.emplojeeProjectJunctions = result;
        if (this.emplojeeProjectJunctions.length > 0) this.getUnassignedEmployees()
        
      });
  }

  // getProjectManagers() {
  //   let managerIDs = this.allProjects.map( (project: any)=>{
  //     return project.managerID;
  //   });
  //   let managers = this.allEmployees.filter( (employee: any) => {
  //     return (managerIDs.indexOf(employee.objID) !== -1)
  //   });
  //   return managers;
  // }

  getUnassignedEmployees() {
    let managerIDs = this.allProjects.map( (project: any)=>{
      return project.managerID;
    });
    let allAssignedIDs = this.emplojeeProjectJunctions.map( (doc:any)=>{
      return doc.employee_id;
    });
    let assignedIDs = [...new Set(allAssignedIDs)];
    this.unassignedEmployees = this.allEmployees.filter( (employee: any) => {
      return (managerIDs.indexOf(employee.objID) === -1) && (assignedIDs.indexOf(employee.objID) === -1);
    });

    console.log(this.unassignedEmployees)
    this.unassigned.next(this.unassignedEmployees);
  }


}
