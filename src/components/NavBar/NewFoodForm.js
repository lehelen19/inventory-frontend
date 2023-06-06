import { useState } from 'react';
import { createFoodItem } from '../../utilities/foodItems/foodItems-service';

const NewFoodForm = ({ id }) => {
  const [newFood, setNewFood] = useState({
    foodName: '',
    foodQuantity: 0,
  });

  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(id);
      console.log(newFood);
      createFoodItem(id, newFood);
      setNewFood('');
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
      ></input>
      <button>Add Food Item</button>
    </form>
  );
};

export default NewFoodForm;
