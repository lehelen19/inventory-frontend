import { useState } from 'react';
import { createFoodItem } from '../utilities/foodItems/foodItems-service';

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
    <form onSubmit={handleSubmit} className="form-control inline">
      <label htmlFor="foodName">
        <span className="label-text m-2">Food item name</span>
      </label>
      <input
        type="text"
        placeholder="Fuji apples"
        name="foodName"
        id="foodName"
        value={newFood.foodName}
        onChange={handleChange}
        required
        className="input input-bordered input-sm"
      ></input>
      <label htmlFor="foodQuantity">
        <span className="label-text m-2">Quantity</span>
      </label>
      <input
        type="number"
        placeholder="How many?"
        name="foodQuantity"
        id="foodQuantity"
        value={newFood.foodQuantity}
        onChange={handleChange}
        required
        className="input input-bordered input-sm"
      ></input>
      <button className="btn btn-sm font-medium bg-secondary hover:bg-secondary ml-2">
        Submit
      </button>
      <p>{error}</p>
    </form>
  );
};

export default NewFoodForm;
