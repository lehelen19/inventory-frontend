import { useState } from 'react';

const NewFoodForm = () => {
  const [newFood, setNewFood] = useState({
    foodName: '',
    quantity: null,
  });

  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createFoodItem(newFood);
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
      <label htmlFor="quantity">Food item name</label>
      <input
        type="number"
        name="foodQuantity"
        id="foodQuantity"
        value={newFood.quantity}
        onChange={handleChange}
      ></input>
      <button>Add Food Item</button>
    </form>
  );
};

export default NewFoodForm;
