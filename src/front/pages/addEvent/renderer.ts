import { CalendarEvent } from '../../interfaces/CalendarEvent';

const formContainer: HTMLElement | null = document.getElementById('addEventForm');

// @ts-ignore
window.electron.prefillDates((startDate, endDate) => {
  const startInput: HTMLInputElement = document.getElementById('start') as HTMLInputElement;
  const endInput: HTMLInputElement = document.getElementById('end') as HTMLInputElement;
  startInput.value = startDate.slice(0, 16);
  endInput.value = endDate.slice(0, 16);
});

if (formContainer) {
  formContainer.addEventListener('submit', function (event) {
    event.preventDefault();
    const form: HTMLFormElement = event.target as HTMLFormElement;

    const formData: FormData = new FormData(form);
    const data: CalendarEvent = {
      title: formData.get('title') as string,
      short_desc: formData.get('short_desc') as string,
      start: formData.get('start') as string,
      end: formData.get('end') as string,
      color: formData.get('color') as string,
    };

    // @ts-ignore
    window.electron.addEvent(data).then(response => {
      alert('Événement ajouté avec succès!');
      form.reset();

      // @ts-ignore
      window.electron.refreshCalendar();
    }).catch(error => {
      console.error('Erreur lors de l\'ajout de l\'événement:', error);
      alert('Erreur lors de l\'ajout de l\'événement');
    });
  });
}
