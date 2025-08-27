
export default function NoteList({ notes, activeId, onSelect }) {
  return (
    <div className="list">
      {notes.length === 0 && <div style={{padding:16, color:'#b9b9c6'}}>No notes yet. Create one!</div>}
      {notes.map(n => (
        <div key={n.id} className={'note-item ' + (n.id === activeId ? 'active' : '')} onClick={() => onSelect(n.id)}>
          <h3>{n.title || 'Untitled'}</h3>
          <div className="meta">{n.content.slice(0, 80)}</div>
        </div>
      ))}
    </div>
  );
}
