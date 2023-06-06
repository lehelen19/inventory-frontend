import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCategoryDetails } from '../../utilities/categories/categories-service';

const CategoryDetailPage = () => {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const { id } = useParams();

  const fetchCategoryDetails = async () => {
    try {
      const foundCategory = await getCategoryDetails(id);
      setCategoryDetails(foundCategory);
    } catch {
      console.log('ERROR');
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const loading = () => {
    return <p>Loading category details...</p>;
  };

  const loaded = () => {
    return (
      <div>
        <h1>{categoryDetails.name}</h1>

        {categoryDetails.foodItems.map((item) => (
          <div>
            <p>
              {item.name} ({item.quantity})
            </p>
          </div>
        ))}
      </div>
    );
  };

  return <div>{categoryDetails ? loaded() : loading()}</div>;
};

export default CategoryDetailPage;
