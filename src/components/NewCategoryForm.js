import { useState } from 'react';
import { createCategory } from '../utilities/categories/categories-service';

const CategoryForm = ({ fetchCategories }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(categoryName);
      setError('');
      setCategoryName('');
      fetchCategories();
    } catch {
      setError('Unable to create category - try again later');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Category name</label>
      <input
        type="text"
        placeholder="Category name..."
        name="name"
        id="name"
        value={categoryName}
        onChange={handleChange}
        required
      ></input>
      <button>Add Category</button>
      <p>{error}</p>
    </form>
  );
};

export default CategoryForm;
