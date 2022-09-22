import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  public users!: User[]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response
    })
  }

  sortByCity() {
    this.users.sort((a, b) => {
      if (a.address.city < b.address.city) return -1;
      else if (a.address.city > b.address.city) return 1;
      else return 0;
    });
  }

  sortByCompany() {
    this.users.sort((a, b) => {
      if (a.company.name < b.company.name) return -1;
      else if (a.company.name > b.company.name) return 1;
      else return 0;
    });
  }
}
