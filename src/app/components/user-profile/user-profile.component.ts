import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { User} from 'src/app/shared/interfaces';
import { userForm } from 'src/app/shared/constants';
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
        name: new FormControl({value: user.name, disabled: true}, [Validators.required,]),
        username: new FormControl({value: user.username, disabled: true}, [Validators.required,]),
        email: new FormControl({value: user.email, disabled: true}, [
          Validators.required,
          UserValidators.invalidEmail,
          Validators.minLength(6)]),
        street: new FormControl({value: user.address.street, disabled: true}, [Validators.required,]),
        city: new FormControl({value: user.address.city, disabled: true}, [Validators.required,]),
        zipcode: new FormControl({value: user.address.zipcode, disabled: true}, [Validators.required,]),
        phone: new FormControl({value: user.phone, disabled: true}, [
          Validators.required,
          UserValidators.invalidPhone,
          Validators.minLength(12),]),
        website: new FormControl({value: user.website, disabled: true}, [
          Validators.required,
          UserValidators.invalidWebsite,
          Validators.minLength(6)]),
        comment: new FormControl('',),
      })
    })
  }

  enableEditMode() {
    this.editMode = true;
    Object.keys(this.form.controls).forEach((controlName) => {
      this.form.controls[controlName]['enable']()
    })
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

      Object.keys(this.form.controls).forEach((controlName) => {
        this.form.controls[controlName]['disable']()
      });

      console.log(JSON.stringify(this.user));
    }

    ngOnDestroy(): void {
      this.routSubscription.unsubscribe();
    }
  }
