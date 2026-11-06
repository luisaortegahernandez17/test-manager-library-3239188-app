import React, { useState } from 'react';

export default function LoanForm() {
  const [memberId, setMemberId] = useState('');
  const [selectedBooks, setSelectedBooks] = useState(['']); // Inicia con un campo de libro
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddBookField = () => {
    if (selectedBooks.length >= 3) {
      setError('Regla de negocio: Un préstamo solo puede tener entre 1 y 3 líneas.');
      return;
    }
    setSelectedBooks([...selectedBooks, '']);
    setError('');
  };

  const handleBookChange = (index, value) => {
    const updated = [...selectedBooks];
    updated[index] = value;
    setSelectedBooks(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validación de libros duplicados (Exigido en api-contract.md -> DUPLICATE_BOOK_IN_LOAN)
    const uniqueBooks = new Set(selectedBooks.filter(id => id.trim() !== ''));
    if (uniqueBooks.size !== selectedBooks.filter(id => id.trim() !== '').length) {
      setError('Error: No se permiten libros repetidos en el mismo préstamo.');
      return;
    }
const payload = {
      member_id: memberId,
      items: selectedBooks.map(id => ({ book_id: id }))
    };

    // Envío exacto al contrato POST /api/v1/loans
    fetch('/api/v1/loans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (res.status === 201) {
        setSuccess('Préstamo registrado exitosamente en el sistema.');
        setMemberId('');
        setSelectedBooks(['']);
      } else {
        setError('Ocurrió un error al procesar el préstamo. Verifique las reglas del negocio.');
      }
    })
    .catch(() => setError('Error al conectar con el servidor.'));
  };
return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h3>Registrar Nuevo Préstamo</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>ID del Socio:</label>
          <input 
            type="text" 
            value={memberId} 
            onChange={(e) => setMemberId(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Libros a prestar (Máx. 3):</label>
          {selectedBooks.map((bookId, index) => (
            <input
              key={index}
              type="text"
              placeholder={ID del Libro #${index + 1}}
              value={bookId}
              onChange={(e) => handleBookChange(index, e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          ))}
          <button type="button" onClick={handleAddBookField} style={{ padding: '5px 10px' }}>
            + Añadir Libro
          </button>
        </div>

        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Guardar Préstamo
        </button>
      </form>
    </div>
  );
}
