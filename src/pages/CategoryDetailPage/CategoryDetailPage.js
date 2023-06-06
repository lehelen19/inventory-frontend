import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryDetails } from '../../utilities/categories/categories-service';
import NewFoodForm from '../../components/NavBar/NewFoodForm';

const CategoryDetailPage = () => {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const foundCategory = await getCategoryDetails(id);
        setCategoryDetails(foundCategory);
      } catch {
        console.log('ERROR');
      }
    };

    fetchCategoryDetails();
  }, [id]);

  const loading = () => {
    return <p>Loading category details...</p>;
  };

  const loaded = () => {
    return (
      <div>
        <h1>{categoryDetails.name}</h1>

        {categoryDetails.foodItems.map((item) => (
          <div key={item._id}>
            <p>
              <Link to={`/items/${item._id}`}>
                {item.name} ({item.quantity})
              </Link>
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {categoryDetails ? loaded() : loading()}
      <NewFoodForm id={id} />
    </div>
  );
};

export default CategoryDetailPage;
