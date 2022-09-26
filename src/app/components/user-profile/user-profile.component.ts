import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { User} from 'src/app/interfaces';
import { userForm } from 'src/app/constants';
import { UserService } from 'src/app/services/user.service';
import { UserValidators } from 'src/app/utils/user.validators';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public user!: User;
  public editMode = false;
  public formInputs: Array<string> = userForm;
  private routSubscription!: Subscription;

  constructor(private route : ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.routSubscription = this.route.params
    .pipe( switchMap( (params: Params) => {
      return this.userService.getById(params['id'])
    } ))
    .subscribe( (user: User) => {
      this.user = user
      this.form = new FormGroup({
        name: new FormControl(user.name, [Validators.required,]),
        username: new FormControl(user.username, [Validators.required,]),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        street: new FormControl(user.address.street, [Validators.required,]),
        city: new FormControl(user.address.city, [Validators.required,]),
        zipcode: new FormControl(user.address.zipcode, [Validators.required,]),
        phone: new FormControl(user.phone, [
          Validators.required,
          UserValidators.invalidPhone,
          Validators.minLength(12),]),
        website: new FormControl(user.website, [
          Validators.required,
          UserValidators.invalidWebsite,
          Validators.minLength(6)]),
        comment: new FormControl('',),
      })
    })
  }

  enableEditMode() {
    this.editMode = true;
    for (let inp of this.formInputs) {
      document.getElementById(inp)?.removeAttribute('disabled')
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }
      this.user = {
        ...this.user,
        name: this.form.value.name,
        username: this.form.value.username,
        email: this.form.value.email,
        address: {
          ...this.user.address,
          street: this.form.value.street,
          city: this.form.value.city,
          zipcode: this.form.value.zipcode,
          },
        phone: this.form.value.phone,
        website: this.form.value.website,
        comment: this.form.value.comment
      }
      this.editMode = false;
      for (let inp of this.formInputs) {
        document.getElementById(inp)?.setAttribute('disabled', '')
      }
      console.log(JSON.stringify(this.user));
    }

    ngOnDestroy(): void {
      this.routSubscription.unsubscribe();
    }
  }
