import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { User } from 'msal';
import { Store } from '@ngrx/store';
import { setInputJsonAction } from './components/app-state/actions/input-json.action';
import { InputJsonState } from './components/app-state/entities/input-json.entity';
import { InputJsonModel } from './components/app-state/models/input-json.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isAuthenticated: boolean;
  private RoiUser;
  private inputjsonData = {
    "username" : "",
    "inputs": [
        {
            "id": "1",
            "value": "0"
        },
        {
            "id": "2",
            "value": "0"
        },
        {
            "id": "3",
            "value": "0"
        },
        {
            "id": "4",
            "value": "No"
        },
        {
            "id": "5",
            "value": "0"
        },
        {
            "id": "6",
            "value": "Yes"
        },
        {
            "id": "7",
            "value": "0"
        },
        {
            "id": "8",
            "value": "No"
        },
        {
            "id": "9",
            "value": "0"
        },
        {
            "id": "10",
            "value": "0"
        },
        {
            "id": "11",
            "value": "0"
        },
        {
            "id": "12",
            "value": "Yes"
        },
        {
            "id": "13",
            "value": "0"
        },
        {
            "id": "14",
            "value": "Yes"
        },
        {
            "id": "15",
            "value": "0"
        },
        {
            "id": "16",
            "value": "0"
        },
        {
            "id": "17",
            "value": "0"
        },
        {
            "id": "18",
            "value": "0"
        },
        {
            "id": "19",
            "value": "0"
        },
        {
            "id": "20",
            "value": "Yes"
        },
        {
            "id": "21",
            "value": "0"
        },
        {
            "id": "22",
            "value": "0"
        },
        {
            "id": "23",
            "value": "Yes"
        },
        {
            "id": "24",
            "value": "0"
        },
        {
            "id": "25",
            "value": "0"
        },
        {
            "id": "26",
            "value": "Yes"
        },
        {
            "id": "27",
            "value": "0"
        },
        {
            "id": "28",
            "value": "Individual"
        },
        {
            "id": "29",
            "value": "0"
        },
        {
            "id": "30",
            "value": "0"
        },
        {
            "id": "86",
            "value": "Yes"
        },
        {
            "id": "31",
            "value": "0"
        },
        {
            "id": "32",
            "value": "Individual"
        },
        {
            "id": "33",
            "value": "0"
        },
        {
            "id": "34",
            "value": "0"
        },
        {
            "id": "35",
            "value": "Yes"
        },
        {
            "id": "36",
            "value": "Yes"
        },
        {
            "id": "37",
            "value": "0"
        },
        {
            "id": "38",
            "value": "0"
        },
        {
            "id": "39",
            "value": "0"
        },
        {
            "id": "40",
            "value": "0"
        },
        {
            "id": "41",
            "value": "Yes"
        },
        {
            "id": "42",
            "value": "Yes"
        },
        {
            "id": "43",
            "value": "0"
        },
        {
            "id": "44",
            "value": "0"
        },
        {
            "id": "45",
            "value": "0"
        },
        {
            "id": "46",
            "value": "No"
        },
        {
            "id": "47",
            "value": null
        },
        {
            "id": "48",
            "value": null
        },
        {
            "id": "49",
            "value": "0"
        },
        {
            "id": "50",
            "value": "0"
        },
        {
            "id": "51",
            "value": "0"
        },
        {
            "id": "52",
            "value": "0"
        },
        {
            "id": "53",
            "value": null
        },
        {
            "id": "54",
            "value": "0"
        },
        {
            "id": "55",
            "value": "Yes"
        },
        {
            "id": "56",
            "value": "Yes"
        },
        {
            "id": "57",
            "value": "0"
        },
        {
            "id": "58",
            "value": "0"
        },
        {
            "id": "59",
            "value": "0"
        },
        {
            "id": "60",
            "value": "Yes"
        },
        {
            "id": "61",
            "value": "0"
        },
        {
            "id": "62",
            "value": 1
        },
        {
            "id": "63",
            "value": "0"
        },
        {
            "id": "64",
            "value": "Yes"
        },
        {
            "id": "65",
            "value": "Yes"
        },
        {
            "id": "66",
            "value": "0"
        },
        {
            "id": "67",
            "value": "0"
        },
        {
            "id": "68",
            "value": "Yes"
        },
        {
            "id": "70",
            "value": "0"
        },
        {
            "id": "71",
            "value": "1"
        },
        {
            "id": "72",
            "value": "Yes"
        },
        {
            "id": "73",
            "value": "0"
        },
        {
            "id": "74",
            "value": "0"
        },
        {
            "id": "75",
            "value": "0"
        },
        {
            "id": "76",
            "value": "0"
        },
        {
            "id": "78",
            "value": "0"
        },
        {
            "id": "79",
            "value": "0"
        },
        {
            "id": "80",
            "value": "0"
        },
        {
            "id": "81",
            "value": "No"
        },
        {
            "id": "82",
            "value": "0"
        },
        {
            "id": "83",
            "value": "Yes"
        },
        {
            "id": "84",
            "value": "0"
        },
        {
            "id": "85",
            "value": "No"
        }
    ],
    "customer": [
        {
            "customerId": "",
            "customerName": "",
            "customerContactFirstName": "",
            "customerContactLastName": "",
            "customerContactEmail": "",
            "customerContactWorkPhone": "",
            "customerContactMobilePhone": ""
        }
    ],
    "opportunity": [
        {
            "scenarioId": "",
            "scenarioDescription": "",
            "scenarioTerm": 0
        }
    ]
}

  ngOnInit(): void {
    var inputJsonModel : InputJsonModel =
    {
      id: "inputJsonModel",
      inputData: this.inputjsonData
    }
    this.store.dispatch(setInputJsonAction({ inputJsonModel}))
  }

  constructor(
    private authService: MsalService, private store: Store<InputJsonState>
  ) {
    if (this.authService.getUser()) {
      this.isAuthenticated = true;
      this.RoiUser = this.authService.getUser();
    } else {
      this.isAuthenticated = false;
      this.RoiUser = null;
    }
  }
}
