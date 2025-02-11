import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VariantManager = () => {
  const [variants, setVariants] = useState([]);
  const [variantName, setVariantName] = useState('');
  const [variantValues, setVariantValues] = useState('');
  const [combinations, setCombinations] = useState([]);

  
  useEffect(() => {
    fetchVariants();
  }, []);

  const fetchVariants = async () => {
    const { data } = await axios.get('/api/variants');
    setVariants(data.data);
  };

  const addVariant = async () => {
    if (!variantName || !variantValues) return alert('All fields are required');
    const valuesArray = variantValues.split(',').map((v) => v.trim());
    await axios.post('/api/variants', { variantsName: variantName, values: valuesArray });
    setVariantName('');
    setVariantValues('');
    fetchVariants();
  };

  const deleteVariant = async (id) => {
    await axios.delete(`/api/variants?id=${id}`);
    fetchVariants();
  };

  const generateCombinations = () => {
    const selectedVariants = variants.map((variant) => variant.values);
    const combinations = selectedVariants.reduce((acc, curr) =>
      acc.flatMap((a) => curr.map((b) => `${a}, ${b}`)), ['']);
    setCombinations(combinations);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Variants Management</h1>

    
      <div className="mb-6">
        <input
          type="text"
          placeholder="Variant Name (e.g., Color)"
          value={variantName}
          onChange={(e) => setVariantName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Values (e.g., Red, Green, Blue)"
          value={variantValues}
          onChange={(e) => setVariantValues(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addVariant} className="bg-blue-500 text-white px-4 py-2">
          Add Variant
        </button>
      </div>


      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Existing Variants</h2>
        {variants.map((variant) => (
          <div key={variant._id} className="flex items-center mb-2">
            <span className="mr-4 font-medium">{variant.variantsName}:</span>
            {variant.values.join(', ')}
            <button
              onClick={() => deleteVariant(variant._id)}
              className="bg-red-500 text-white ml-4 px-2 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>


      <button
        onClick={generateCombinations}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        Generate Combinations
      </button>

      {combinations.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-2">Generated Combinations</h2>
          <ul className="list-disc ml-6">
            {combinations.map((combo, index) => (
              <li key={index}>{combo}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VariantManager;