import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFoodDetails } from '../../utilities/foodItems/foodItems-service';

const FoodItemDetailPage = () => {
  const [foodDetails, setFoodDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const foundFoodDetails = await getFoodDetails(id);
        setFoodDetails(foundFoodDetails);
      } catch {
        console.log('error getting food details');
      }
    };

    fetchFoodDetails();
  }, [id]);

  const loading = () => <p>Loading food item details...</p>;

  const loaded = () => {
    return (
      <div>
        <h1>{foodDetails.name}</h1>
        <p>{foodDetails.quantity}</p>
      </div>
    );
  };

  return <div>{foodDetails ? loaded() : loading()}</div>;
};

export default FoodItemDetailPage;
