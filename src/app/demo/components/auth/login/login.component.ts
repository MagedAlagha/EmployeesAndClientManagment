import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './login.component.html',
    styles: [
        `
            .box {
                background: url('../../../../../assets/img/paattern4.png');
                background-position: top;
                background-size: cover;
                min-height: 100vh;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    User = new FormControl();
    constructor(private layoutService: LayoutService,
        private router :Router) {}

    get filledInput(): boolean {
        return this.layoutService.config.inputStyle === 'filled';
    }
    loginDropdown = new FormControl();
    userID!: string;
    login() {
        /* localStorage.setItem('client', 'client');
		localStorage.setItem('employee', 'employee');
		localStorage.setItem('admin', 'admin');
		localStorage.setItem('managment', 'managment');  */
        localStorage.setItem('User', this.User?.value);
        this.router.navigate(['/'])
    }

    ngOnInit() {
        this.loginDropdown.valueChanges.subscribe((x) => {
            this.userID = x;
        });
    }
}
