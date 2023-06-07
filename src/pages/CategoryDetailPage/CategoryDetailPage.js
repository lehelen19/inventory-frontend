import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryDetails } from '../../utilities/categories/categories-service';
import { deleteFoodItem } from '../../utilities/foodItems/foodItems-service';
import NewFoodForm from '../../components/NavBar/NewFoodForm';

const CategoryDetailPage = () => {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [editingInput, setEditingInput] = useState(null);
  const { id } = useParams();

  const fetchCategoryDetails = async () => {
    try {
      const foundCategory = await getCategoryDetails(id);
      setCategoryDetails(foundCategory);
    } catch {
      console.log('ERROR');
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, [id]);

  const handleDeleteFoodItem = async (id) => {
    try {
      const returnedCategories = await deleteFoodItem(id);
      setCategoryDetails(returnedCategories);
    } catch {
      console.log('Could not delete food item. Try again later.');
    }
  };

  const handleEditStart = (id) => {
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
    console.log(editingInput);
  };

  const loading = () => {
    return <p>Loading category details...</p>;
  };

  const loaded = () => {
    return (
      <div>
        <h1>{categoryDetails.name}</h1>
        {categoryDetails.foodItems.map((item) => (
          <div key={item._id}>
            {editingInput && editingInput._id === item._id ? (
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
            ) : (
              <>
                <Link to={`/items/${item._id}`}>
                  {item.name} ({item.quantity})
                </Link>
                <button onClick={() => handleEditStart(item._id)}>Edit</button>
                <button onClick={() => handleDeleteFoodItem(item._id)}>
                  Delete
                </button>
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
      <NewFoodForm id={id} fetchCategoryDetails={fetchCategoryDetails} />
    </div>
  );
};

export default CategoryDetailPage;
