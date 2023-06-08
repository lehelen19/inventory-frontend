import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  deleteCategory,
  updateCategory,
} from '../../utilities/categories/categories-service';
import CategoryForm from '../../components/NewCategoryForm';

const InventoryPage = ({ user }) => {
  const [categories, setCategories] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editCategoryInput, setEditCategoryInput] = useState(null);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const foundCategories = await getCategories();
      setCategories(foundCategories);
    } catch {
      setError('Unable to fetch categories - try again later');
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCheckDelete = (id) => {
    setDeleteId(id);
    setError('');
  };

  const handleConfirmDelete = async (id) => {
    try {
      await deleteCategory(id);
      await fetchCategories();
      setDeleteId(null);
    } catch {
      setError('Unable to delete category - try again later');
    }
  };

  const handleEditStart = (id) => {
    setError('');
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
      setError('Unable to update category name - try again later');
    }
  };

  const loading = () => {
    if (error) {
      return <p>{error}</p>;
    }
    return (
      <p className="m-2">
        Loading categories{' '}
        <span className="loading loading-spinner text-primary"></span>
      </p>
    );
  };

  const loaded = () => {
    return categories.map((category) => (
      <article
        key={category._id}
        className="card w-80 h-40 m-2 bg-secondary shadow-xl"
      >
        <div className="card-body">
          {(() => {
            if (user && deleteId === category._id) {
              return (
                <div>
                  <p>
                    Are you sure you want to delete the {category.name}{' '}
                    category?
                  </p>
                  <button onClick={() => handleConfirmDelete(category._id)}>
                    Delete
                  </button>
                  <button onClick={() => setDeleteId(null)}>Cancel</button>
                  <p>{error}</p>
                </div>
              );
            } else if (
              user &&
              editCategoryInput &&
              editCategoryInput.id === category._id
            ) {
              return (
                <>
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
                  <p>{error}</p>
                </>
              );
            } else {
              return (
                <>
                  <h2 className="card-title">
                    <Link
                      to={`/categories/${category._id}`}
                      className="tracking-wide"
                    >
                      {category.name}
                    </Link>
                  </h2>
                  {user && (
                    <div className="card-actions">
                      <button
                        className="btn btn-sm"
                        onClick={() => handleEditStart(category._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm"
                        onClick={() => handleCheckDelete(category._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              );
            }
          })()}
        </div>
      </article>
    ));
  };

  return (
    <main className="bg-base-200 min-h-screen">
      <h1>Inventory Page</h1>
      {user && <CategoryForm fetchCategories={fetchCategories} />}
      <section className="flex flex-wrap">
        {categories ? loaded() : loading()}
      </section>
    </main>
  );
};

export default InventoryPage;
