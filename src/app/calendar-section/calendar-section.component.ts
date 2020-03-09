import { Component, OnInit } from '@angular/core';
import * as $ from "jQuery";

@Component({
  selector: 'app-calendar-section',
  templateUrl: './calendar-section.component.html',
  styleUrls: ['./calendar-section.component.css']
})
export class CalendarSectionComponent implements OnInit {
  year: number;
  month: number;
  day: number;
  date: number;
  calendarMonth: number;
  calendarYear: number;
  calendarDateArray: Date[] = Array(42).fill(new Date());
  
  getWeekDayName(day): string {
    var weekDayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return weekDayNames[day];
  }
  getMonthName(month): string {
    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return monthNames[month];
  }
  showPreviousMonth(): void {
    console.log("Prev...");  
    this.calendarMonth--;  
    if( this.calendarMonth == -1) {
        this.calendarYear--;
        this.calendarMonth = 11;
    }
    this.fillInMonth();
  }
  showThisMonth(): void {
    let today = new Date();
    this.calendarYear = today.getFullYear();
    this.calendarMonth = today.getMonth();
    this.fillInMonth();
  }
  showNextMonth(): void {
    console.log("Next...");
    this.calendarMonth++;  
    if( this.calendarMonth == 12) {
      this.calendarYear++;
        this.calendarMonth = 0;
    }
    this.fillInMonth();
  }
  fillInMonth(): void{
    this.collapseWeek(); // 把展開的星期摺疊回去
    let curYear = this.calendarYear;
    let curMonth = this.calendarMonth;
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //第一個元素放個啞巴元素，好讓我們可以用1~12來存取月份的天數
    //判斷今年是否是閏年
    if ( ((curYear % 4 == 0) && (curYear % 100 != 0)) || (curYear % 400 == 0) ) monthDays[1] = 29;
    let weekDay = (new Date(curYear, curMonth, 1)).getDay() ; //取得今年今月1日為禮拜幾
    console.log(curYear, curMonth, this.getWeekDayName(weekDay));
    let days = document.getElementsByClassName("day");
    // 清除顏色與class
    for (var i = 0; i <= 41; i++){
        if (days[i].classList.contains("color")) days[i].classList.remove("color");
    }
    // 上個月
    let prevMonth = curMonth - 1;
    if (prevMonth == -1) prevMonth = 11;
    for (var i = 0; i < weekDay; i++){
      days[i].firstChild.innerHTML = monthDays[prevMonth]-weekDay+i+1; 
      days[i].classList.add("color");

      console.log(days[i].classList);

      this.calendarDateArray[i] = new Date(curYear, curMonth-1, monthDays[prevMonth]-weekDay+i+1);
    }
    // 這個月
    for (var i = 1; i <= monthDays[curMonth]; i++){
      days[weekDay + i - 1].firstChild.innerHTML = i;

      this.calendarDateArray[weekDay + i - 1] = new Date(curYear, curMonth, i);
    }
    // 下個月
    for (var i = 1; i + weekDay + monthDays[curMonth] <= days.length; i++){
      days[i + weekDay + monthDays[curMonth] - 1].firstChild.innerHTML = i;
      days[i + weekDay + monthDays[curMonth] - 1].classList.add("color");

      this.calendarDateArray[i + weekDay + monthDays[curMonth] - 1] = new Date(curYear, curMonth+1, i);
    }
    console.log(this.calendarDateArray);

    if (document.getElementById("current-day")) {
      document.getElementById("current-day").removeAttribute("id");
    }
    days[weekDay + this.date - 1].setAttribute("id", "current-day");
    // 分出第幾週
    for (var i = 0; i <= 41; i++){
      days[i].classList.add(`week${Math.floor(i/7)}`);
    }
  }
  collapseWeek(): void {
    $('.day-table').slideUp();
  }

  expandWeek(currentDay): void {
    if ($(currentDay.lastChild).is(":hidden")) {
      this.fillInMonth();
      let thisWeek;
      for (var i = 0; i <= 6; i++){
        if (currentDay.classList.contains(`week${i}`)) {
          thisWeek = `week${i}`;
        }
      }
      let weekDays = document.getElementsByClassName(thisWeek);
      for (var day of weekDays[Symbol.iterator]()) { // object{}用in, list[]用of
        var dayTable = day.lastChild;
        $(dayTable).slideToggle();
      }
    } else {
      this.collapseWeek();
    }
  }

  constructor() { }

  ngOnInit(): void {
    let today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth();
    this.day = today.getDay();
    this.date = today.getDate();
    this.calendarMonth = today.getMonth();
    this.calendarYear = today.getFullYear();
    this.fillInMonth();
  }
  ngAfterViewInit() {
  }

}
