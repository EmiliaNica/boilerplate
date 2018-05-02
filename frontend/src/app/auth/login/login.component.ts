import { Component, OnInit } from '@angular/core';
import { userService } from '../../userService.service';
import { users } from '../../users';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usr: string;
  pass: string;
  status: string;

  private data: users[] = new Array(50);
  private index: number = 0;
  constructor(private userService: userService, private router: Router) { }

  ngOnInit() {

    this.userService.getEveryone().subscribe((res: users[]) => {

      this.data = res;

    });

  }

  onClick() {

    if (!(this.usr && this.pass))
      this.status = "Please enter all credentials.";
    else {

      this.status = 'Please enter valid credentials.';
      this.data.forEach(element => {
        if ((this.usr === element.username) && (this.pass === element.password)) {
          let user = JSON.stringify(element);


          this.router.navigate(['pages/home'], { queryParams:element });
        }

      });
    }
  }
}
