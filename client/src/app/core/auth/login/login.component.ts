import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm = this.fb.group({
        username: [''],
        password: [''],
    });

    error = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private fb: UntypedFormBuilder,
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit(): void {
    }

    login() {
        if (!this.loginForm.valid) {
            return;
        }
        this.spinner.show();
        this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe({
                next: () => {
                    // TODO: navigate to orders
                    this.router.navigate(['/users']);
                },
                error: (e) => {
                    if (e.status === 401) {
                        this.error = 'Helytelen felhasznalónév vagy jelszó!'
                    } else {
                        this.error = e;
                    }
                },
                complete: () => this.spinner.hide()
            })
    }

}
