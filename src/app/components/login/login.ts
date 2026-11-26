import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceAuth } from '../../services/service-auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  
  ServicioAuth = inject(ServiceAuth)

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] })
  });

  async onSubmit(event: Event) {
    console.log(this.loginForm.value);
    event.preventDefault()
    const formValue = this.loginForm.getRawValue()
try {
    const response = await this.ServicioAuth.loginUsuario(
      formValue.email,
      formValue.password
    )
    console.log(response)
    localStorage.setItem('token', (response as { token: string }).token);
  } catch (error) {
    console.error(error)
  }
}
}

