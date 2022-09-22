import { FormControl, FormControlName } from "@angular/forms";

export class UserValidators {

  static invalidPhone(control: FormControl): {[key: string]: boolean} | null {

    const regExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d{3,5}))?\s*$/gm;

    if (!regExp.test(control.value)) {
      return {invalidPhone: true}
    }
    return null
  }

  static invalidWebsite(control: FormControl): {[key: string]: boolean} | null {

    const regExp = /^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/;

    if (!regExp.test(control.value)) {
      return {invalidWebsite: true}
    }
    return null
  }
}
