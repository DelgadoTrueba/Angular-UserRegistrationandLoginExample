import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup; 

  constructor(
    private _formBuilder: FormBuilder,
  ){ }

  ngOnInit() {
    this.createForm();
    this.onChangesPassword();
  }

  createForm(){
    this.userForm = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),

      lastName: new FormControl('', [Validators.required]),

      email:  new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*"),
      ]),
      
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$_%]).{6,20})"),
      ]),

      confirmPassword: new FormControl({value: '', disabled: true}, [Validators.required]),

      address: new FormControl('', [Validators.required])

    }, { validator: this.checkPasswords });
  }

  checkPasswords(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('password').value;
    const confirmPass = control.get('confirmPassword').value;

    if (pass !== "" && confirmPass !=="" && pass !== confirmPass) {
      control.get('confirmPassword').setErrors({ notSame: true });
      return { notSame: true };
    }
    
    return null;          
  }

  onChangesPassword(): void {
    this.userForm.get('password').valueChanges.subscribe(val => {
      if(val !== "" && !this.userForm.get('password').errors ){
        this.userForm.get('confirmPassword').enable();
      }
      else{
        this.userForm.get('confirmPassword').disable();
      }
    });
  }

  firstNameRequired(): boolean {
    return this.userForm.controls.firstName.errors && this.userForm.controls.firstName.errors.required;
  }

  lastNameRequired(): boolean {
    return this.userForm.controls.lastName.errors && this.userForm.controls.lastName.errors.required;
  }

  addressRequired(): boolean {
    return this.userForm.controls.address.errors && this.userForm.controls.address.errors.required;
  }

  emailRequired(): boolean {
    return this.userForm.controls.email.errors && this.userForm.controls.email.errors.required;
  }

  emailFormat(): boolean {
    return this.userForm.controls.email.errors && this.userForm.controls.email.errors.pattern;
  }

  passwordRequired(): boolean {
    return this.userForm.controls.password.errors && this.userForm.controls.password.errors.required;
  }

  passwordFormat(): boolean {
    return this.userForm.controls.password.errors && this.userForm.controls.password.errors.pattern;
  }

  confirmPasswordRequired(): boolean {
    return this.userForm.controls.confirmPassword.errors && this.userForm.controls.confirmPassword.errors.required;
  }

  confirmPasswordNotSame(): boolean {
    return this.userForm.controls.confirmPassword.errors && this.userForm.controls.confirmPassword.errors.notSame;
  }

  onSubmit(){
    console.log(this.userForm.value);
  }

  onReset(){
    this.userForm.reset();
   
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].setErrors(null)
    });
  }

}
