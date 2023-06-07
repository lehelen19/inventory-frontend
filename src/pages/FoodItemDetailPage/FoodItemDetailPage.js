import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getFoodDetails,
  updateFoodItem,
  deleteFoodItem,
} from '../../utilities/foodItems/foodItems-service';

const FoodItemDetailPage = ({ user }) => {
  const [foodDetails, setFoodDetails] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      const category = await deleteFoodItem(id);
      navigate(`/categories/${category._id}`);
    } catch {
      console.log('Failed to delete item');
    }
  };

  const loading = () => <p>Loading food item details...</p>;

  const loaded = () => {
    return (
      <>
        <div>
          <h1>{foodDetails.name}</h1>
          <p>Quantity: {foodDetails.quantity}</p>

          <h2>Nutritional Value for {foodDetails.food_name}</h2>
          <p>
            Serving size: {foodDetails.serving_qty} {foodDetails.serving_unit}{' '}
            or {foodDetails.serving_weight_grams} grams
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
        {(() => {
          if (user && confirmDelete) {
            return (
              <>
                <p>Are you sure you want to delete {foodDetails.name}?</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => setConfirmDelete(false)}>Cancel</button>
              </>
            );
          } else if (user && !confirmDelete) {
            return (
              <button onClick={() => setConfirmDelete(true)}>
                Delete {foodDetails.name}
              </button>
            );
          }
        })()}
      </>
    );
  };

  return <div>{foodDetails ? loaded() : loading()}</div>;
};

export default FoodItemDetailPage;
