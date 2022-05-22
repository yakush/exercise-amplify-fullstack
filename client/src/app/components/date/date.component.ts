import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  //@Input() date: Date|string|undefined = new Date();
  @Input() showDate = true;
  @Input() showTime = true;

  _date?: Date;

  @Input() set date(value: Date | string | undefined) {
    if (value instanceof Date) {
      this._date = value;
      return;
    }
    if (typeof value === 'string') {
      this._date = new Date(value);
      return;
    }
    this._date = undefined;
  }
  get date(): string | undefined {
    if (!this._date) {
      return undefined;
    }

    //build output string
    const browserLocale =
      navigator.language || (navigator.languages || ['en'])[0];

    let str = '';
    if (this.showDate) {
      str += this._date.toLocaleDateString(browserLocale, {
        dateStyle: 'medium',
      });
    }
    if (this.showDate && this.showTime) {
      str += ' ';
    }
    if (this.showTime) {
      str += this._date.toLocaleTimeString(browserLocale);
    }

    return str;
  }

  constructor() {}

  ngOnInit(): void {}
}
