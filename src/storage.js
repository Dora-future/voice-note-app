export function loadNotes() {
  try { return JSON.parse(localStorage.getItem('notes')) || []; }
  catch(e){ return []; }
}

export function saveNotes(notes) { localStorage.setItem('notes', JSON.stringify(notes)); }

export function exportNotes(notes) {
  const blob = new Blob([JSON.stringify(notes, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download='notes.json'; a.click();
}

export function importNotes(setNotes){
  const input = document.createElement('input'); input.type='file';
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = ev => setNotes(JSON.parse(ev.target.result));
    reader.readAsText(file);
  };
  input.click();
}
