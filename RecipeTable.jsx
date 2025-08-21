import React from 'react';
import Star from './Star';

export default function RecipeTable({ recipes, loading, page, setPage, limit, setLimit, filters, setFilters, mode, handleSearch, clearSearch, onSelect }){
  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-semibold">Recipe Explorer</h1>
        <p className="text-sm text-gray-600">Paginated list (sorted by rating desc) and a flexible search endpoint. Click any row to open details.</p>
      </header>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <input className="p-2 border rounded" placeholder="Title contains..." value={filters.title}
                 onChange={e=>setFilters({...filters, title: e.target.value})} />
          <input className="p-2 border rounded" placeholder="Cuisine..." value={filters.cuisine}
                 onChange={e=>setFilters({...filters, cuisine: e.target.value})} />
          <input className="p-2 border rounded" placeholder="Rating operator e.g. >=4.5" value={filters.rating}
                 onChange={e=>setFilters({...filters, rating: e.target.value})} />
          <input className="p-2 border rounded" placeholder="Calories operator e.g. <=400" value={filters.calories}
                 onChange={e=>setFilters({...filters, calories: e.target.value})} />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSearch}>Search</button>
          <button className="px-3 py-2 border rounded" onClick={clearSearch}>Clear</button>
          <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
            <span>Mode:</span>
            <span className="px-2 py-1 border rounded bg-gray-100">{mode}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="text-left p-2">Title</th>
                <th className="p-2">Cuisine</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Total Time</th>
                <th className="p-2">Serves</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-6 text-center">Loading...</td></tr>
              ) : recipes.length === 0 ? (
                <tr><td colSpan={5} className="p-6 text-center text-gray-500">No recipes found</td></tr>
              ) : recipes.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 cursor-pointer" onClick={()=>onSelect(r)}>
                  <td className="p-2 max-w-[520px] truncate">{r.title}</td>
                  <td className="p-2">{r.cuisine || '-'}</td>
                  <td className="p-2"><Star n={r.rating} /></td>
                  <td className="p-2">{r.total_time ?? '-'}</td>
                  <td className="p-2">{r.serves ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button className="px-3 py-1 border rounded" onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
          <div>Page <strong>{page}</strong></div>
          <button className="px-3 py-1 border rounded" onClick={()=>setPage(p=>p+1)}>Next</button>
          <div className="ml-auto flex items-center gap-2">
            <label className="text-sm text-gray-600">Per page:</label>
            <select className="p-1 border rounded" value={limit} onChange={e=>setLimit(parseInt(e.target.value))}>
              {[15,20,30,50].map(x => <option key={x} value={x}>{x}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}