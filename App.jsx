import React, { useEffect, useState } from 'react';
import RecipeTable from './components/RecipeTable';
import Drawer from './components/Drawer';

const API_BASE = process.env.REACT_APP_API || (window.location.origin.includes('3000') ? 'http://localhost:4000' : '/');

export default function App(){
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({ title: '', cuisine: '', rating: '', calories: '' });
  const [mode, setMode] = useState('list');

  useEffect(()=>{
    if (mode !== 'list') return;
    setLoading(true);
    fetch(`${API_BASE}/api/recipes?page=${page}&limit=${limit}`)
      .then(r=>r.json())
      .then(j=>{
        setRecipes(j.data || []);
        setTotal(j.total || (j.data||[]).length);
      })
      .catch(console.error)
      .finally(()=>setLoading(false));
  }, [page, limit, mode]);

  function handleSearch(){
    const params = new URLSearchParams();
    if (filters.title) params.set('title', filters.title);
    if (filters.cuisine) params.set('cuisine', filters.cuisine);
    if (filters.rating) params.set('rating', filters.rating);
    if (filters.calories) params.set('calories', filters.calories);
    if ([...params].length === 0) {
      setMode('list');
      setPage(1);
      return;
    }
    setLoading(true);
    setMode('search');
    fetch(`${API_BASE}/api/recipes/search?${params.toString()}`)
      .then(r=>r.json())
      .then(j=>{
        setRecipes(j.data || []);
        setTotal((j.data||[]).length);
      })
      .catch(console.error)
      .finally(()=>setLoading(false));
  }

  function clearSearch(){
    setFilters({ title: '', cuisine: '', rating: '', calories: '' });
    setMode('list');
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <RecipeTable
        recipes={recipes}
        loading={loading}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        filters={filters}
        setFilters={setFilters}
        mode={mode}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
        onSelect={setSelected}
      />

      {selected && (
        <Drawer recipe={selected} onClose={()=>setSelected(null)} />
      )}
    </div>
  );
}