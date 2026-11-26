import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServiceAuth } from '../../services/service-auth';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {
  provincias = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
    'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria',
    'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona',
    'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares',
    'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lérida',
    'Lugo', 'Madrid', 'Málaga', 'Melilla', 'Murcia', 'Navarra',
    'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife',
    'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo',
    'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ];

  ServicioAuth = inject(ServiceAuth)
  
  registroForm = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    apellidos: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3), Validators.pattern(/^\S+$/)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)] }),
    foto: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    provincia: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    codigo_postal: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{5}$/)] })
  });

  async onSubmit(event: Event) {
    console.log(this.registroForm.value);
    event.preventDefault()
    const formValue = this.registroForm.getRawValue()

    try {
      const response = await this.ServicioAuth.registrarUsuario({
        ...formValue,
        codigo_postal: Number(formValue.codigo_postal),
        localizacion: `${formValue.provincia}, ${formValue.codigo_postal}`
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
}
