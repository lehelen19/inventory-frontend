import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  return <div>FoodItemDetailPage</div>;
};

export default FoodItemDetailPage;
