import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {

  public users!: User[];
  private serviceSubscription!: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.serviceSubscription = this.userService.getUsers().subscribe(response => {
      this.users = response
    })
  }

  sortByCity() {
    this.users.sort((a, b) => {
      if (a.address.city < b.address.city) {
        return -1
      }
      else if (a.address.city > b.address.city) {
        return 1
      }
      return 0
    })
  }

  sortByCompany() {
    this.users.sort((a, b) => {
      if (a.company.name < b.company.name) {
        return -1
      }
      else if (a.company.name > b.company.name) {
        return 1
      }
      return 0
    })
  }

  ngOnDestroy(): void {
   this.serviceSubscription.unsubscribe()
  }
}
