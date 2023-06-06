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

  return (
    <>
      <h1>Inventory Page</h1>
      <div>Categories go here</div>
    </>
  );
};

export default InventoryPage;
