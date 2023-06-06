import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFoodDetails } from '../../utilities/foodItems/foodItems-service';

const FoodItemDetailPage = () => {
  const [foodDetails, setFoodDetails] = useState(null);
  const { id } = useParams();

  const fetchFoodDetails = async () => {
    try {
      const foundFoodDetails = await getFoodDetails(id);
      setFoodDetails(foundFoodDetails);
    } catch {
      console.log('error getting food details');
    }
  };

  const loading = () => <p>Loading food item details...</p>;

  const loaded = () => {
    return <div>{JSON.stringify(foodDetails)}</div>;
  };

  return <div>{foodDetails ? loaded() : loading()}</div>;
};

export default FoodItemDetailPage;
