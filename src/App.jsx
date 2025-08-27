import { useEffect, useMemo, useState } from 'react';
import NoteEditor from './components/NoteEditor.jsx';
import NoteList from './components/NoteList.jsx';
import './index.css';
import { exportNotes, importNotes, loadNotes, saveNotes } from './storage.js';

function createNote(){
  const now = Date.now();
  return { id: crypto.randomUUID(), title: '', content: '', tags: [], createdAt: now, updatedAt: now };
}

export default function App(){
  const [notes, setNotes] = useState(() => loadNotes());
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(() => notes[0]?.id);

  useEffect(() => { saveNotes(notes); }, [notes]);

  const active = useMemo(() => notes.find(n => n.id === activeId) || notes[0] || null, [notes, activeId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if(!q) return notes.sort((a,b)=>b.updatedAt-a.updatedAt);
    return notes.filter(n => {
      const text = (n.title + ' ' + n.content + ' ' + (n.tags||[]).join(' ')).toLowerCase();
      return text.includes(q);
    }).sort((a,b)=>b.updatedAt-a.updatedAt);
  }, [notes, query]);

  useEffect(() => {
    if(!active && notes.length){
      setActiveId(notes[0].id);
    }
  }, [notes, active]);

  const onChange = (updated) => setNotes(ns => ns.map(n => n.id === updated.id ? updated : n));
  const onNew = () => { const n = createNote(); setNotes(ns => [n, ...ns]); setActiveId(n.id); };
  const onDelete = (id) => { const next = notes.filter(n => n.id !== id); setNotes(next); if(activeId === id && next.length){ setActiveId(next[0].id); } };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="header">
          <h1>Morgan's Voice Note App</h1>
          <p>Take notes quickly and organise easily!</p>
        </div>
        <div className="search">
          <input placeholder="Search notes or #tags…" value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
        <NoteList notes={filtered} activeId={active?.id} onSelect={setActiveId} />
        <div className="actions">
          <button onClick={onNew}>+ New Note</button>
          <button onClick={()=>exportNotes(notes)}>Export</button>
          <button onClick={()=>importNotes(setNotes)}>Import</button>
        </div>
      </div>
      {active ? (
        <NoteEditor note={active} onChange={onChange} onNew={onNew} onDelete={onDelete} />
      ) : (
        <div style={{flex:1, display:'grid', placeItems:'center', opacity:0.7}}>
          <div>No notes yet. Create your first one!</div>
        </div>
      )}
    </div>
  );
}
