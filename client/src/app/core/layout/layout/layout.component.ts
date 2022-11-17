import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/sdk';
import { LoginService } from '../../auth/login.service';
import { NestAuthService } from '../../auth/nest-auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  user: UserDto;

  constructor(
    private nestAuthService: NestAuthService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.user = this.nestAuthService.getUser();
  }

  logout() {
    this.loginService.logout();
  }

}
