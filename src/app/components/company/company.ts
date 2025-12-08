import { Component } from '@angular/core';
import {WorkInProgress} from "../../pages/work-in-progress/work-in-progress";

@Component({
  selector: 'app-company',
    imports: [
        WorkInProgress
    ],
  templateUrl: './company.html',
  styleUrl: './company.scss',
})
export class Company {

}
