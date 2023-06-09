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
      <p className="p-2">
        Loading food item details{' '}
        <span className="loading loading-spinner text-primary"></span>
      </p>
    );
  };

  const loaded = () => {
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center">
            <div className="max-w-24 mr-4 my-4 border-2 border-primary rounded-md">
              <img
                src={`${foodDetails.photo.thumb}`}
                alt={`Thumbnail of ${foodDetails.food_name}`}
                className="rounded-md"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold pt-4 pb-2 capitalize">
                {foodDetails.name}
              </h1>
              <p className="bg-primary text-white p-1 mb-2 text-center">
                {foodDetails.quantity} currently available
              </p>
            </div>
          </div>
          <section className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">
              Nutrition Facts for{' '}
              <span className="capitalize">{foodDetails.food_name}</span>
            </h2>
            <hr className="border-1 border-primary mx-4 my-4 w-64" />
            <table className="table table-sm border-collapse text-center">
              <tbody>
                <tr>
                  <th>Serving Size</th>
                  <td>
                    {foodDetails.serving_qty} {foodDetails.serving_unit} or{' '}
                    {foodDetails.serving_weight_grams} grams
                  </td>
                </tr>
                <tr>
                  <th>Calories</th>
                  <td>{foodDetails.nf_calories}</td>
                </tr>
                <tr>
                  <th>Total fat</th>
                  <td>{foodDetails.nf_total_fat}g</td>
                </tr>
                <tr>
                  <th>Saturated fat</th>
                  <td>{foodDetails.nf_saturated_fat}g</td>
                </tr>
                <tr>
                  <th>Cholesterol</th>
                  <td>{foodDetails.nf_cholesterol}mg</td>
                </tr>
                <tr>
                  <th>Sodium</th>
                  <td>{foodDetails.nf_sodium}mg</td>
                </tr>
                <tr>
                  <th>Total carbohydrates</th>
                  <td>{foodDetails.nf_total_carbohydrate}g</td>
                </tr>
                <tr>
                  <th>Dietary fiber</th>
                  <td>{foodDetails.nf_dietary_fiber}g</td>
                </tr>
                <tr>
                  <th>Sugars</th>
                  <td>{foodDetails.nf_sugars}g</td>
                </tr>
                <tr>
                  <th>Protein</th>
                  <td>{foodDetails.nf_protein}g</td>
                </tr>
                <tr>
                  <th>Potassium</th>
                  <td>{foodDetails.nf_potassium}mg</td>
                </tr>
              </tbody>
            </table>
          </section>
          <div className="mt-4 text-center">
            {(() => {
              if (user && confirmDelete) {
                return (
                  <>
                    <p className="mb-2">
                      Are you sure you want to delete{' '}
                      <span className="capitalize italic">
                        {foodDetails.name}
                      </span>
                      ?
                    </p>
                    <button
                      onClick={handleDelete}
                      className="btn btn-sm font-medium bg-error hover:bg-error mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="btn btn-sm font-medium bg-secondary hover:bg-secondary"
                    >
                      Cancel
                    </button>
                    {error && <p>{error}</p>}
                  </>
                );
              } else if (user && !confirmDelete) {
                return (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="btn btn-sm font-medium bg-error hover:bg-error"
                  >
                    Delete {foodDetails.name}
                  </button>
                );
              }
            })()}
          </div>
        </div>
      </>
    );
  };

  return (
    <main className="bg-base-200 pb-10">
      {foodDetails ? loaded() : loading()}
    </main>
  );
};

export default FoodItemDetailPage;
