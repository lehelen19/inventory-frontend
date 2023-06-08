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
      <p className="m-2">
        Loading category details{' '}
        <span className="loading loading-spinner text-primary"></span>
      </p>
    );
  };

  const loaded = () => {
    return (
      <div>
        <h1>{categoryDetails.name}</h1>
        {categoryDetails.foodItems.map((item) => (
          <div key={item._id}>
            {user && editingInput && editingInput._id === item._id ? (
              <>
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={editingInput.name}
                    onChange={handleEditChange}
                    autoFocus
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={editingInput.quantity}
                    onChange={handleEditChange}
                  />
                  <button>Save</button>
                </form>
                <p>{error}</p>
              </>
            ) : (
              <>
                <Link to={`/items/${item._id}`}>
                  {item.name} ({item.quantity})
                </Link>
                {user && (
                  <>
                    <button onClick={() => handleEditStart(item._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteFoodItem(item._id)}>
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {categoryDetails ? loaded() : loading()}
      {user && (
        <NewFoodForm id={id} fetchCategoryDetails={fetchCategoryDetails} />
      )}
    </div>
  );
};

export default CategoryDetailPage;
