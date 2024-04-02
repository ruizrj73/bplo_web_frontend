import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginError: string;
  isProcessing: boolean = false;
  username: string = "";
  password: string = "";
  slides: { iimage: string }[] = [
    { iimage: "../../assets/img/slide/img1.jpg" },
    { iimage: "../../assets/img/slide/img2.jpg" },
    { iimage: "../../assets/img/slide/img3.jpg" },
  ]

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    
  }

  async login() {
    if (this.username != "" && this. password != "") {
      if (this.isProcessing) return;
      this.hide = true;
      this.isProcessing = true;

      setTimeout(() => 
      {
        this.authService.userLogin(
          this.username,
          this.password
        ).then((res) => {
          this.router.navigate(['dashboard']);
          this.isProcessing = false;
          window.location.reload();
        }).catch((err => {
          this.loginError = "User not valid!";
          this.isProcessing = false;
        }));
      }, 1000);
    } else {
      this.loginError = "User not valid!";
      this.isProcessing = false;
    }
  }

}
