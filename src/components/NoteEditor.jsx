
export default function NoteEditor({ note, onChange, onDelete }) {
  if(!note) return null;

  return (
    <div className="editor" style={{flex:1, padding:16}}>
      <input
        style={{width:'100%', padding:8, fontSize:16, marginBottom:8}}
        value={note.title}
        placeholder="Note Title"
        onChange={e => onChange({ ...note, title:e.target.value, updatedAt:Date.now() })}
      />
      <textarea
        style={{width:'100%', height:'60%', padding:8}}
        value={note.content}
        placeholder="Note Content"
        onChange={e => onChange({ ...note, content:e.target.value, updatedAt:Date.now() })}
      />
      <button style={{marginTop:8}} onClick={() => onDelete(note.id)}>Delete Note</button>
    </div>
  );
}
