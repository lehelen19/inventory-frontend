import { useRef, useCallback } from 'react';
import { createCategory } from '../../utilities/categories/categories-service';

const CategoryForm = ({ fetchCategories }) => {
  const form = useRef();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { name } = e.target;
      try {
        createCategory(name);
      } catch {
        console.log('error');
      }
      fetchCategories();
      console.log('rerender');
    },
    [fetchCategories]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Category name..."></input>
      <button>Add Category</button>
    </form>
  );
};

export default CategoryForm;
