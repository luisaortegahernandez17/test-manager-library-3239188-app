import React from 'react';
import BookList from './components/BookList';
import LoanForm from './components/LoanForm';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', margin: '0 auto', maxWidth: '1200px', padding: '20px' }}>
      <header style={{ backgroundColor: '#20232a', color: 'white', padding: '20px', borderRadius: '5px', marginBottom: '30px' }}>
        <h1>Manager Library — Panel de Gestión (SDD)</h1>
        <p>Ficha ADSO 3239188 · Solución en React y PHP Laravel</p>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        <section style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', height: 'fit-content' }}>
          <LoanForm />
        </section>

        <section style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '5px' }}>
          <BookList />
        </section>
      </main>
    </div>
  );
}
