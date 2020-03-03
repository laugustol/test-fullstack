import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/User.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user = {};
  option = 1
  privateUsers = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        res => this.privateUsers = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
  }
  goBack(){
    this.option = 1
    this.user = {}
  }
  selected(user){
    this.option = 2
    this.user = { _id:user._id,email:user.email,country:user.country }
  }
  addAndUpdate(){
    if(this.option == 2){
      this.userService.updateUser(this.user)
      .subscribe(
        res => this.privateUsers = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
    }else{
      this.userService.addUser(this.user)
      .subscribe(
        res => this.privateUsers = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
    }
  }
  delete(_id){
    this.user = {}
    this.userService.deleteUser({_id})
      .subscribe(
        res => this.privateUsers = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
  }

}
