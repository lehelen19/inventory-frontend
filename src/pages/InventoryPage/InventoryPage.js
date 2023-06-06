import { useState, useEffect } from 'react';
import { getCategories } from '../../utilities/categories/categories-service';

const InventoryPage = () => {
  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    try {
      const foundCategories = await getCategories();
      setCategories(foundCategories);
    } catch {
      console.log('Error');
    }
  };

  useEffect(() => {
    fetchCategories();
  });

  const loading = () => {
    return <p>Loading categories...</p>;
  };

  const loaded = () => {
    return categories.map((category) => (
      <p key={category._id}>{category.name}</p>
    ));
  };

  return (
    <>
      <h1>Inventory Page</h1>
      {categories ? loaded() : loading()}
    </>
  );
};

export default InventoryPage;
