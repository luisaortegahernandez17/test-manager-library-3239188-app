import React, { useState, useEffect } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Consumo estricto del contrato de la API de Laravel /api/v1/books
    fetch(/api/v1/books?q=${search}&page=${page}&size=20)
      .then(response => response.json())
      .then(data => setBooks(data.items || []))
      .catch(error => console.error("Error al conectar con la API:", error));
  }, [search, page]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Catálogo de Libros - Manager Library</h2>
      <input 
        type="text" 
        placeholder="Buscar por título, autor o ISBN..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Categoría</th>
            <th>Disponibles</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No se encontraron libros activos.</td></tr>
          ) : (
            books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.category?.name}</td>
                <td>{book.available_copies} / {book.total_copies}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
