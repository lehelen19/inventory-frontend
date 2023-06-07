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
    console.log(deleteId);
  };

  const handleConfirmDelete = (id) => {
    console.log(id);
  };

  const loading = () => {
    return <p>Loading categories...</p>;
  };

  const loaded = () => {
    return categories.map((category) => (
      <div key={category._id}>
        <p>{category.name}</p>
        <Link to={`/categories/${category._id}`}>Details</Link>

        {deleteId === category._id ? (
          <div>
            <p>Are you sure you want to delete the {category.name} category?</p>
            <button>Delete</button>
            <button>Cancel</button>
          </div>
        ) : (
          <>
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
