const addBtn: HTMLElement | null = document.getElementById('add-event');
const inputName: HTMLInputElement | null = <HTMLInputElement | null>document.getElementById('name');
const inputDesc: HTMLInputElement | null = <HTMLInputElement | null>document.getElementById('desc');

if (addBtn) {
  addBtn.addEventListener('click', () => {
    if (inputName && inputDesc) {
      window.electron.addEvent({ name: inputName.value, desc:  inputDesc.value });
    } else {
      alert('ERROR: No input name or input desc');
    }
  });
} else {
  alert("ERROR: No addButton");
}
