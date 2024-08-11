export class MyDate {
  year: number;
  monthIndex: number;
  daysOfWeek: string[];
  monthNames: string[];
  daysInMonth: number;
  firstDayOfMonth: number;
  monthName: string;

  constructor(year?: number, month?: number) {
    const today = new Date();
    this.year = year || today.getFullYear();
    this.monthIndex = (typeof month === 'number') ? month : today.getMonth();
    
    this.monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
    ];
    
    this.daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    this.monthName = this.monthNames[this.monthIndex];
    
    const firstDay = new Date(this.year, this.monthIndex, 1);
    this.firstDayOfMonth = firstDay.getDay();
    
    const lastDay = new Date(this.year, this.monthIndex + 1, 0);
    this.daysInMonth = lastDay.getDate();
  }
}
