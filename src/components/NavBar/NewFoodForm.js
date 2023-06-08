import { useState } from 'react';
import { createFoodItem } from '../../utilities/foodItems/foodItems-service';

const NewFoodForm = ({ id, fetchCategoryDetails }) => {
  const [newFood, setNewFood] = useState({
    foodName: '',
    foodQuantity: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFoodItem(id, newFood);
      setNewFood({
        foodName: '',
        foodQuantity: '',
      });
      fetchCategoryDetails();
      setError('');
    } catch {
      setError('Unable to add food item - try again later');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="foodName">Food item name</label>
      <input
        type="text"
        placeholder="Name..."
        name="foodName"
        id="foodName"
        value={newFood.foodName}
        onChange={handleChange}
        required
      ></input>
      <label htmlFor="foodQuantity">Quantity</label>
      <input
        type="number"
        name="foodQuantity"
        id="foodQuantity"
        value={newFood.foodQuantity}
        onChange={handleChange}
        required
      ></input>
      <button>Add Food Item</button>
      <p>{error}</p>
    </form>
  );
};

export default NewFoodForm;
