import React from 'react';
import { formatNutr } from '../utils/format';

export default function Drawer({ recipe, onClose }){
  if (!recipe) return null;
  const n = recipe.nutrients || {};
  const rows = [
    ['Calories', n.calories],
    ['Carbohydrate', n.carbohydrateContent],
    ['Fat', n.fatContent],
    ['Saturated Fat', n.saturatedFatContent],
    ['Protein', n.proteinContent],
    ['Fiber', n.fiberContent],
    ['Sugar', n.sugarContent],
    ['Sodium', n.sodiumContent],
    ['Cholesterol', n.cholesterolContent]
  ];

  return (
    <div className="fixed right-4 top-6 bottom-6 w-[420px] bg-white shadow-2xl rounded p-4 overflow-auto">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">{recipe.title}</h2>
          <div className="text-xs text-gray-500">{recipe.cuisine}</div>
        </div>
        <button className="px-2 py-1 border rounded" onClick={onClose}>Close</button>
      </div>

      <div className="mt-3 text-sm text-gray-700">
        <div><strong>Description:</strong>
          <div className="mt-1 text-gray-600 whitespace-pre-wrap">{recipe.description || '-'}</div>
        </div>
        <div className="mt-3">
          <strong>Times</strong>
          <div className="text-sm text-gray-600">Prep: {recipe.prep_time ?? '-'} min</div>
          <div className="text-sm text-gray-600">Cook: {recipe.cook_time ?? '-'} min</div>
          <div className="text-sm text-gray-600">Total: {recipe.total_time ?? '-'} min</div>
        </div>
        <div className="mt-3"><strong>Serves:</strong> {recipe.serves ?? '-'}</div>
        <div className="mt-3">
          <strong>Nutrition</strong>
          <table className="w-full text-sm mt-2 table-auto">
            <tbody>
              {rows.map(([k,v])=> (
                <tr key={k}><td className="p-2 border text-xs w-1/2">{k}</td><td className="p-2 border text-xs">{formatNutr(v)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}