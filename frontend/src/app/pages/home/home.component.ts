import { Component, OnInit, Injectable, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { users } from '../../users';
import { courses } from '../../courses';
import { records } from '../../records';
import { recordService } from '../../recordService.service';
import { courseService } from '../../courseService.service';
import { userService } from '../../userService.service';
import { element } from 'protractor';
import { studentRecords } from '../../studentRecords';
import { teacherRecords } from '../../teacherRecords';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {


  courses: courses[];
  course: courses;
  selectedCourse: courses;
  selectedTeacherCourse: courses;
  freeCourses: courses[] = [];
  entries: records[] = [];
  unatendedCourses: courses[] = [];
  teachers: users[] = [];
  isTeaching: boolean = true;
  loggedUser: users;
  teacherCourse: courses;
  courseOption: courses;
  entriesLoaded: boolean = false;
  entryDetalis: studentRecords[] = [];
  entriesTeachers:teacherRecords[] =[];
  teachersStudents:users[] =[];
  teachersSelectedStudent:users;
  newGrade:number;

  constructor(private thisRoute: ActivatedRoute, private entryService: recordService, private coursesService: courseService,
    private UserService: userService) {}

  ngOnInit() {
  
    if (!this.loggedUser.teacher) {
      this.UserService.getTeachers().subscribe((_teachers: users[]) => {
        this.teachers = _teachers;

        this.coursesService.getCourses().subscribe((res: courses[]) => {
          res.forEach(element => {
            this.unatendedCourses.push(element);
          });
          this.courses = res;
          this.getEntriesForLoggedStudent();
        });
      });
    }
    
  }


  getEntriesForLoggedStudent() {
    this.entryService.getEntriesForStudent(this.loggedUser.id).subscribe((_entries: records[]) => {
      if (_entries.length > 0) {
        let unatCoursesAux: courses[] = [];
        this.unatendedCourses.forEach((element: courses) => {

          let isContained: boolean = false;

          let entryDetalisIndex: number = 0;

          _entries.forEach((entry: records) => {
            if (entry.courseID == element.id) {
              isContained = true;
              this.entryDetalis.push(new studentRecords(this.diplayCourseName(entry), this.displayTeacherName(entry), entry.grade));
            }
            entryDetalisIndex++;
          });
          if (!isContained) {
            unatCoursesAux.push(element);
          }
        });
        this.entries = _entries;
        this.unatendedCourses = unatCoursesAux;
      }
      this.entriesLoaded = true;
    });
  }

  getEntriesForLoggedTeacher(){
    this.entryService.getEntriesForTeacher(this.course.id).subscribe((_entries:records[])=>{
      
      this.UserService.getStudents().subscribe((_students:users[])=>{
        _entries.forEach((_entry:records)=>{
          _students.forEach((_student:users) =>{
            if(_entry.studID == _student.id){
              this.entriesTeachers.push(new teacherRecords(_student.name,_entry.grade));
              this.teachersStudents.push(_student);
            }
          });
        });
      });
      this.entries = _entries;
    });
  }

  getFreeCourses() {
    this.coursesService.getFreeCourses().subscribe((_freeCourses: courses[]) => {
      this.freeCourses = _freeCourses;

    });
  }
  getTeachedCurse() {

    if (this.course === undefined)
      this.isTeaching = false;

  }
  onSelectCourseClick() {

 

    if (!(this.loggedUser.teacher)) {
      if (!(this.selectedCourse === null) || (this.selectedCourse === undefined)) {
        let _entry = {
          id_course: this.selectedCourse.id,
          id_student: this.loggedUser.id,
          grade: 0

        };
        this.entryService.addEntry(_entry).subscribe(res => {
          window.location.reload();
        });

      }

    }
    else {

      this.selectedTeacherCourse.teachID = this.loggedUser.id;
      this.coursesService.updateCourse(this.selectedTeacherCourse).subscribe(res => {
        window.location.reload();

      });

    }

  }

  diplayCourseName(entry: records): string {
    let returnString: string;
    this.courses.forEach(_course => {
      if (_course.id == entry.courseID)
        returnString = _course.name;
    });

    return returnString;


  }

  displayTeacherName(entry: records): string {
    let returnString: string;

    this.courses.forEach(_course => {
      if (entry.courseID == _course.id)
        this.teachers.forEach(_teacher => {
          if (_course.teachID == _teacher.id)
            returnString = _teacher.name;
        });
    });

    return returnString;
  }

  getIsTeaching(): boolean {

    return this.isTeaching;
  }

  updateGrade(){
    this.entries.forEach(_entry=>
    {
      if(_entry.studID == this.teachersSelectedStudent.id){
        _entry.grade = this.newGrade;
        this.entryService.updateEntry(_entry).subscribe(res=>{
          window.location.reload();
        });
      }
    });
  }


}