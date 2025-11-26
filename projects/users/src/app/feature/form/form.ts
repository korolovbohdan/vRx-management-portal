import {Component, effect, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersApplicationService} from '../../data-access/application/users-application.service';
import {UserStore} from '../../data-access/store/user.store';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CreateUserDto} from '../../data-access/common/dto/request.dto';

@Component({
  selector: 'app-form',
  templateUrl: './form.html',
  styleUrl: './form.scss',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
  ],
  providers: [
    UserStore,
    UsersApplicationService,
  ]
})
export class Form implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _usersApplicationService = inject(UsersApplicationService);

  protected userForm: FormGroup;
  protected roles = [
    {label: 'Admin', value: 'admin'},
    {label: 'User', value: 'user'},
  ];
  protected isSubmitting = false;

  constructor() {
    this.userForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
    });

    effect(() => {
      const state = this._usersApplicationService.createCallState();
      if (this.isSubmitting && state === 'loaded') {
        this._router.navigate(['/users']);
        this.isSubmitting = false;
      } else if (this.isSubmitting && typeof state === 'object' && 'error' in state) {
        console.error('Error creating user:', state.error);
        this.isSubmitting = false;
      }
    });
  }

  ngOnInit(): void {
  }

  protected onSubmit(): void {
    if (this.userForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formValue = this.userForm.value;
      const createUserDto = new CreateUserDto(formValue.name, formValue.role);

      this._usersApplicationService.createUser(createUserDto);
    }
  }

  protected onCancel(): void {
    this._router.navigate(['/users']);
  }
}

