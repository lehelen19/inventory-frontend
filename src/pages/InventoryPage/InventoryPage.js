import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from '../../utilities/categories/categories-service';
import CategoryForm from '../../components/NavBar/NewCategoryForm';

const InventoryPage = ({ user }) => {
  const [categories, setCategories] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editCategoryInput, setEditCategoryInput] = useState(null);

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
    try {
      await deleteCategory(id);
      await fetchCategories();
      setDeleteId(null);
    } catch {
      console.log('Error - could not delete category');
    }
  };

  const handleEditStart = (id) => {
    const category = categories.find((category) => category._id === id);
    if (category) {
      setEditCategoryInput({ id, name: category.name });
    }
  };

  const handleEditChange = (e) => {
    setEditCategoryInput({
      ...editCategoryInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(editCategoryInput);
      fetchCategories();
      setEditCategoryInput(null);
    } catch {
      console.log('Unable to update category');
    }
  };

  const loading = () => {
    return <p>Loading categories...</p>;
  };

  const loaded = () => {
    return categories.map((category) => (
      <div key={category._id}>
        {(() => {
          if (user && deleteId === category._id) {
            return (
              <div>
                <p>
                  Are you sure you want to delete the {category.name} category?
                </p>
                <button onClick={() => handleConfirmDelete(category._id)}>
                  Delete
                </button>
                <button onClick={() => setDeleteId(null)}>Cancel</button>
              </div>
            );
          } else if (
            user &&
            editCategoryInput &&
            editCategoryInput.id === category._id
          ) {
            return (
              <form onSubmit={handleEditSubmit}>
                <input
                  type="text"
                  name="name"
                  value={editCategoryInput.name}
                  onChange={handleEditChange}
                  autoFocus
                />
                <button>Submit</button>
              </form>
            );
          } else {
            return (
              <>
                <h3>
                  <Link to={`/categories/${category._id}`}>
                    {category.name}
                  </Link>
                </h3>
                {user && (
                  <>
                    <button onClick={() => handleEditStart(category._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleCheckDelete(category._id)}>
                      Delete
                    </button>
                  </>
                )}
              </>
            );
          }
        })()}
      </div>
    ));
  };

  return (
    <>
      <h1>Inventory Page</h1>
      {user && <CategoryForm fetchCategories={fetchCategories} />}
      {categories ? loaded() : loading()}
    </>
  );
};

export default InventoryPage;
