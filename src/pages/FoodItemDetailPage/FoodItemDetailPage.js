import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getFoodDetails,
  deleteFoodItem,
} from '../../utilities/foodItems/foodItems-service';

const FoodItemDetailPage = ({ user }) => {
  const [foodDetails, setFoodDetails] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const foundFoodDetails = await getFoodDetails(id);
        setFoodDetails(foundFoodDetails);
      } catch {
        setError('Unable to fetch food details - try again later');
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const category = await deleteFoodItem(id);
      navigate(`/categories/${category._id}`);
    } catch {
      setError('Unable to delete food item - try again later');
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setError('');
  };

  const loading = () => {
    if (error) {
      return <p>{error}</p>;
    }
    return (
      <p className="m-2">
        Loading food item details{' '}
        <span className="loading loading-spinner text-primary"></span>
      </p>
    );
  };

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
                <button onClick={handleCancelDelete}>Cancel</button>
                {error && <p>{error}</p>}
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

  return (
    <main className="bg-base-200 min-h-screen">
      {foodDetails ? loaded() : loading()}
    </main>
  );
};

export default FoodItemDetailPage;
