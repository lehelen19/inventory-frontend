import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryDetails } from '../../utilities/categories/categories-service';
import {
  deleteFoodItem,
  updateFoodItem,
} from '../../utilities/foodItems/foodItems-service';
import NewFoodForm from '../../components/NewFoodForm';

const CategoryDetailPage = ({ user }) => {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [editingInput, setEditingInput] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchCategoryDetails = useCallback(async () => {
    try {
      const foundCategory = await getCategoryDetails(id);
      setCategoryDetails(foundCategory);
    } catch {
      setError('Unable to retrieve category details - try again later');
    }
  }, [id]);

  useEffect(() => {
    fetchCategoryDetails();
  }, [fetchCategoryDetails]);

  const handleDeleteFoodItem = async (id) => {
    try {
      const returnedCategoryDetails = await deleteFoodItem(id);
      setCategoryDetails(returnedCategoryDetails);
      setError('');
    } catch {
      setError('Unable to delete food item - try again later');
    }
  };

  const handleEditStart = (id) => {
    setError('');
    const foodItem = categoryDetails.foodItems.find((item) => item._id === id);
    if (foodItem) {
      setEditingInput({
        _id: id,
        name: foodItem.name,
        quantity: foodItem.quantity,
      });
    }
  };

  const handleEditChange = (e) => {
    setEditingInput({ ...editingInput, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const returnedCategoryDetails = await updateFoodItem(editingInput);
      setCategoryDetails(returnedCategoryDetails);
      setEditingInput(null);
      setError('');
    } catch {
      setError('Unable to update food item - try again later');
    }
  };

  const loading = () => {
    if (error) {
      return <p>{error}</p>;
    }

    return (
      <p className="p-2">
        Loading category details{' '}
        <span className="loading loading-spinner text-primary"></span>
      </p>
    );
  };

  const loaded = () => {
    return (
      <div className="overflow-x-auto">
        <h1>{categoryDetails.name}</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categoryDetails.foodItems.map((item) => (
              <tr key={item._id} className=" hover:bg-amber-50">
                {user && editingInput && editingInput._id === item._id ? (
                  <td colSpan={4}>
                    <form onSubmit={handleEditSubmit}>
                      <input
                        type="text"
                        name="name"
                        value={editingInput.name}
                        onChange={handleEditChange}
                        autoFocus
                        className="input input-bordered input-sm mx-2"
                      />
                      <input
                        type="number"
                        name="quantity"
                        value={editingInput.quantity}
                        onChange={handleEditChange}
                        className="input input-bordered input-sm"
                      />
                      <button className="btn btn-sm font-medium inline ml-2 bg-secondary hover:bg-secondary">
                        Save
                      </button>
                    </form>
                    <p>{error}</p>
                  </td>
                ) : (
                  <>
                    <th>
                      <Link to={`/items/${item._id}`} className="capitalize">
                        {item.name}
                      </Link>
                    </th>
                    <td>{item.quantity}</td>
                    <td>
                      {user && (
                        <button
                          onClick={() => handleEditStart(item._id)}
                          className="btn btn-sm font-medium bg-secondary hover:bg-secondary"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      {user && (
                        <button
                          onClick={() => handleDeleteFoodItem(item._id)}
                          className="btn btn-sm font-medium bg-secondary hover:bg-secondary"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <main className="bg-base-200 min-h-screen">
      {categoryDetails ? loaded() : loading()}
      <br />
      {user && (
        <NewFoodForm id={id} fetchCategoryDetails={fetchCategoryDetails} />
      )}
    </main>
  );
};

export default CategoryDetailPage;
