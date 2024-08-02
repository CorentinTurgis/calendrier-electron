export class MyDate {
  daysOfWeek: string[];
  calendarDate: Date;
  monthIndex: number;
  year: number;
  firstDayOfMonth: number;
  daysInMonth: number;

  constructor(year?: number, month?: number) {
    this.daysOfWeek = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    if (month && year) {
      this.calendarDate = new Date(year, month);
    } else {
      this.calendarDate = new Date();
    }
    this.year = this.calendarDate.getFullYear();
    this.monthIndex = this.calendarDate.getMonth() + 1;
    this.firstDayOfMonth = new Date(this.year, this.monthIndex -1, 1).getDay();
    this.daysInMonth = new Date(this.year, this.monthIndex, 0).getDate();
  }
}