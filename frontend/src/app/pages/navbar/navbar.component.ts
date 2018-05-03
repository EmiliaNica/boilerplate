import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { users } from '../../users';
import { courses } from '../../courses';
import { courseService } from '../../courseService.service';
import { HomeComponent } from '../home/home.component';
import { parse } from 'querystring';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser: users;
  displayString: String;
  course: courses;
  executeCourseUpdate: boolean = true;
  constructor(private thisRoute: ActivatedRoute, private courseService: courseService) { }
  
  @ViewChild(HomeComponent) home: HomeComponent;
  ngOnInit() {
    this.thisRoute.queryParams.subscribe(user => {

      let parsedBool:boolean;
      switch(user.teacher){
        case "true":{
          parsedBool = true;
          break;
        }
        case "false":{
          parsedBool = false;
        }
      }
      this.loggedUser = new users(user.id,user.name,parsedBool,user.username,user.password);
      this.home.loggedUser = this.loggedUser;
      this.displayString = this.displayNameAndCourse();
     

      
      if (this.loggedUser.teacher)
        this.courseService.getCourseForTeacher(this.loggedUser.id).subscribe((res: courses) => {
           if (this.executeCourseUpdate) {
            this.course = res[0];
            this.home.course = res[0];
            this.home.getTeachedCurse();
            this.home.getFreeCourses();
            this.home.getEntriesForLoggedTeacher();
            this.displayString = this.displayNameAndCourse();
            this.executeCourseUpdate = false;
           }
        });
    });

  }

  displayNameAndCourse(): string {
    let returnedString: string;

    if (this.loggedUser.teacher) {
      if (!(this.course === undefined)) {
        returnedString = "Logged in as " + this.loggedUser.name + " -  " + this.course.name;
      } else
        returnedString = "Logged in as " + this.loggedUser.name + " - no courses";

    }
    else {
      returnedString = "Logged in as " + this.loggedUser.name;
    }
    return returnedString;
  }

}