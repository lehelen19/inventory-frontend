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
        className="m-2 bg-secondary shadow-xl py-2 rounded-md"
      >
        {(() => {
          if (user && deleteId === category._id) {
            return (
              <div className="min-h-full flex flex-col justify-center">
                <p className="mb-2">
                  Are you sure you want to delete the{' '}
                  <span className="capitalize italic">{category.name}</span>{' '}
                  category?
                </p>
                <div>
                  <button
                    onClick={() => handleConfirmDelete(category._id)}
                    className="btn btn-sm font-medium bg-error hover:bg-error mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="btn btn-sm font-medium bg-green-600 hover:bg-green-600"
                  >
                    Cancel
                  </button>
                  <p>{error}</p>
                </div>
              </div>
            );
          } else if (
            user &&
            editCategoryInput &&
            editCategoryInput.id === category._id
          ) {
            return (
              <div className="h-full flex flex-col justify-center mx-2">
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={editCategoryInput.name}
                    onChange={handleEditChange}
                    autoFocus
                    className="input input-bordered input-sm w-1/2 mr-2 lg:w-2/3"
                  />
                  <div className="mt-2">
                    <button
                      type="submit"
                      className="btn btn-sm font-medium inline lg:mt-2 mr-4"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditCategoryInput(null);
                      }}
                      className="btn btn-sm font-medium inline lg:mt-2 bg-error hover:bg-error"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                <p>{error}</p>
              </div>
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
      </article>
    ));
  };

  return (
    <main className="bg-base-200 px-8 pb-10">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold pt-4 pb-2">Food Categories</h1>
        <hr className="border-1 border-primary w-28 mb-2" />
        {user && (
          <div className="collapse rounded-sm w-auto mb-2">
            <input type="checkbox" />
            <div className="text-center collapse-title pr-0">
              <h3 className="text-lg font-semibold">Add a new category</h3>
            </div>
            <div className="collapse-content text-center">
              <CategoryForm fetchCategories={fetchCategories} />
            </div>
          </div>
        )}
      </div>
      <section className="grid grid-cols-3 gap-x-10 gap-y-5 text-center">
        {categories ? loaded() : loading()}
      </section>
    </main>
  );
};

export default InventoryPage;
