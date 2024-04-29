import React, { useState, useEffect } from 'react';

const Test = () => {
  const [entry, setEntry] = useState({
    text: '',
    mood: '😊',
    achievements: '',
    gratitude: '',
    challenges: ''
  });
  const [diaryEntries, setDiaryEntries] = useState(() => {
    const savedEntries = localStorage.getItem('diaryEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.text.trim()) return;
    const newEntry = editingId ? diaryEntries.map(e => e.id === editingId ? { ...e, ...entry } : e) : [...diaryEntries, { ...entry, id: Date.now() }];
    setDiaryEntries(newEntry);
    localStorage.setItem('diaryEntries', JSON.stringify(newEntry));
    setEntry({ text: '', mood: '😊', achievements: '', gratitude: '', challenges: '' });
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const entryToEdit = diaryEntries.find(entry => entry.id === id);
    setEntry(entryToEdit);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const updatedEntries = diaryEntries.filter(entry => entry.id !== id);
    setDiaryEntries(updatedEntries);
    localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Diario Personal</h1>
        <div className="columns">
          <div className="column is-half">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">¿Cómo estás hoy?</label>
                <div className="control">
                  <div className="select">
                    <select name="mood" value={entry.mood} onChange={handleChange}>
                      <option value="😊">😊 Contento</option>
                      <option value="😢">😢 Triste</option>
                      <option value="😠">😠 Enojado</option>
                      <option value="🤔">🤔 Pensativo</option>
                      <option value="😱">😱 Sorprendido</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Nueva Entrada</label>
                <div className="control">
                  <textarea className="textarea" name="text" placeholder="¿Qué pasó hoy?" value={entry.text} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="field">
                <label className="label">¿Qué lograste hoy?</label>
                <div className="control">
                  <textarea className="textarea" name="achievements" placeholder="Logros del día..." value={entry.achievements} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="field">
                <label className="label">¿Por qué estás agradecido hoy?</label>
                <div className="control">
                  <textarea className="textarea" name="gratitude" placeholder="Motivos de gratitud..." value={entry.gratitude} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="field">
                <label className="label">¿Qué desafíos enfrentaste y cómo los manejaste?</label>
                <div className="control">
                  <textarea className="textarea" name="challenges" placeholder="Desafíos del día..." value={entry.challenges} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="control">
                <button type="submit" className="button is-primary">{editingId ? 'Actualizar' : 'Guardar'}</button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setEntry({ text: '', mood: '😊', achievements: '', gratitude: '', challenges: '' }); }} className="button is-light">Cancelar</button>}
              </div>
            </form>
          </div>
          <div className="column is-half">
            <h2 className="title is-4">Entradas Anteriores</h2>
            {diaryEntries.map((entry) => (
              <div key={entry.id} className="box">
                <h1>Estado de ánimo: {entry.mood}</h1>
                <p>{entry.text}</p>
                <h1 className="title is-6" >Logros: {entry.achievements}</h1>
                <p>Gratitud: {entry.gratitude}</p>
                <p>Desafíos: {entry.challenges}</p>
                <button onClick={() => handleEdit(entry.id)} className="button is-small is-info">Editar</button>
                <button onClick={() => handleDelete(entry.id)} className="button is-small is-danger">Eliminar</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
  
};

export default Test;
