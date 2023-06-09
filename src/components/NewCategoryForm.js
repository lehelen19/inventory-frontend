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
    <form onSubmit={handleSubmit} className="form-control max-w-sm inline">
      <label htmlFor="name" className="label-text">
        <span className="label-text m-2">Category name</span>
      </label>
      <input
        type="text"
        placeholder="Fruits"
        name="name"
        id="name"
        value={categoryName}
        onChange={handleChange}
        required
        className="input input-bordered input-sm"
      ></input>
      <button className="btn btn-sm font-medium bg-secondary hover:bg-secondary ml-2">
        Add Category
      </button>
      <p>{error}</p>
    </form>
  );
};

export default CategoryForm;
