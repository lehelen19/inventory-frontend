import { useState, useEffect } from 'react';
import { getCategories } from '../../utilities/categories/categories-service';
import { Link } from 'react-router-dom';
import CategoryForm from '../../components/NavBar/NewCategoryForm';

const InventoryPage = () => {
  const [categories, setCategories] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

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
  }, []);

  const handleCheckDelete = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async (id) => {
    console.log(id);
    try {
      const returnedCategories = await deleteCategory(id);
      setCategories(returnedCategories);
      setDeleteId(null);
    } catch {
      console.log('Error - could not delete category');
    }
  };

  const loading = () => {
    return <p>Loading categories...</p>;
  };

  const loaded = () => {
    return categories.map((category) => (
      <div key={category._id}>
        {deleteId === category._id ? (
          <div>
            <p>Are you sure you want to delete the {category.name} category?</p>
            <button onClick={() => handleConfirmDelete(category._id)}>
              Delete
            </button>
            <button onClick={() => setDeleteId(null)}>Cancel</button>
          </div>
        ) : (
          <>
            <p>{category.name}</p>
            <Link to={`/categories/${category._id}`}>Details</Link>
            <button>Edit</button>
            <button onClick={() => handleCheckDelete(category._id)}>
              Delete
            </button>
          </>
        )}
      </div>
    ));
  };

  return (
    <>
      <h1>Inventory Page</h1>
      <CategoryForm fetchCategories={fetchCategories} />
      {categories ? loaded() : loading()}
    </>
  );
};

export default InventoryPage;
