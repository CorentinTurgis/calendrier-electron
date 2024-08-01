const container: HTMLElement | null = document.getElementById('calendar');

if (container) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Les jours de la semaine
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Créez les en-têtes de jour de la semaine
  daysOfWeek.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.className = 'day day-header';
    dayHeader.innerText = day;
    container.appendChild(dayHeader);
  });

  // Obtenez le premier jour du mois et le nombre de jours dans le mois
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Créez des cases vides pour les jours avant le début du mois
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'day';
    container.appendChild(emptyDay);
  }

  // Créez les jours du mois
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.innerText = day.toString();
    container.appendChild(dayElement);
  }
}
