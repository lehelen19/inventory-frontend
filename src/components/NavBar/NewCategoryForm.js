import { useState } from 'react';
import { createCategory } from '../../utilities/categories/categories-service';

const CategoryForm = ({ fetchCategories }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createCategory(categoryName);
      setCategoryName('');
      fetchCategories();
    } catch {
      console.log('error');
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
    </form>
  );
};

export default CategoryForm;
