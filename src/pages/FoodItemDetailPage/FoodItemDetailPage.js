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
        <p>Quantity: {foodDetails.quantity}</p>

        <h2>Nutritional Value for {foodDetails.food_name}</h2>
        <p>
          Serving size: {foodDetails.serving_qty} ({foodDetails.serving_unit} or{' '}
          {foodDetails.serving_weight_grams} grams)
        </p>
        <p>Calories: {foodDetails.nf_calories}</p>
        <p>Total fat: {foodDetails.nf_total_fat}g</p>
        <p>Saturated fat: {foodDetails.nf_saturated_fat}g</p>
        <p>Cholesterol: {foodDetails.nf_cholesterol}mg</p>
        <p>Sodium: {foodDetails.nf_sodium}mg</p>
        <p>Total carbohydrates: {foodDetails.nf_total_carbohydrate}g</p>
        <p>Dietary fiber: {foodDetails.nf_dietary_fiber}g</p>
        <p>Sugars: {foodDetails.nf_sugars}g</p>
        <p>Protein: {foodDetails.nf_protein}g</p>
        <p>Potassium: {foodDetails.nf_potassium}mg</p>
        <img
          src={`${foodDetails.photo.thumb}`}
          alt={`Thumbnail of ${foodDetails.food_name}`}
        />
      </div>
    );
  };

  return <div>{foodDetails ? loaded() : loading()}</div>;
};

export default FoodItemDetailPage;
