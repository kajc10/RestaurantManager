import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegisterDto } from 'src/app/sdk';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm = this.fb.group({
        username: [''],
        passwordOne: [''],
        passwordTwo: [''],
    });
    error = '';

    constructor(
        private router: Router,
        private loginService: LoginService,
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.spinner.hide();
    }
    register(): void {
        if (!this.registerForm.valid) {
            return;
        }
        if (this.registerForm.value.passwordOne !== this.registerForm.value.passwordTwo) {
            this.error = 'A megadott jelszavak különböznek';
            return;
        }
        this.spinner.show();
        const registerDto: RegisterDto = {
            username: this.registerForm.value.username,
            password: this.registerForm.value.passwordOne,
        };
        this.loginService.register(registerDto)
            .subscribe({
                next: () => {
                    this.router.navigate(['/login']);
                },
                error: (e) => {
                    this.spinner.hide();
                    if (e.status === 400) {
                        this.error = 'A megadott felhasználó név már foglalt';
                    } else {
                        this.error = e;
                    }
                    
                },
            })
    }

}
