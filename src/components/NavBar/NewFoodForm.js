import { useState } from 'react';
import { createFoodItem } from '../../utilities/foodItems/foodItems-service';

const NewFoodForm = ({ id, fetchCategoryDetails }) => {
  const [newFood, setNewFood] = useState({
    foodName: '',
    foodQuantity: '',
  });

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
    } catch {
      console.log('error');
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
    </form>
  );
};

export default NewFoodForm;
