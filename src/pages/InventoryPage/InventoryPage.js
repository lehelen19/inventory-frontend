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
      <p className="p-2">
        Loading categories{' '}
        <span className="loading loading-spinner text-primary"></span>
      </p>
    );
  };

  const loaded = () => {
    return categories.map((category) => (
      <article
        key={category._id}
        className="m-2 bg-secondary shadow-xl py-2 rounded-md "
      >
        <div>
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
                  <Link to={`/categories/${category._id}`}>
                    <h2 className="text-xl font-semibold tracking-wide">
                      {category.name}
                    </h2>
                    <div className="flex justify-center m-4">
                      <img
                        src={process.env.PUBLIC_URL + 'img/grocery.png'}
                        className="w-16"
                        alt="A plant logo that directs you to the home page on click."
                      />
                    </div>
                  </Link>
                  {user && (
                    <div className="py-2">
                      <button
                        className="btn btn-sm mr-4"
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
    <main className="bg-base-200 min-h-screen px-8">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold pt-4 pb-2">Food Categories</h1>
        <hr className="border-1 border-primary mb-4 w-28" />
      </div>
      <section className="grid grid-cols-3 gap-x-10 gap-y-5 text-center">
        {categories ? loaded() : loading()}
      </section>
      <hr className="border-1 border-primary m-4" />
      <div className="text-center">
        {user && <CategoryForm fetchCategories={fetchCategories} />}
      </div>
    </main>
  );
};

export default InventoryPage;
