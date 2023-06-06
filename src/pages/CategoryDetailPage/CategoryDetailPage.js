import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

  return <div>CategoryDetailPage</div>;
};

export default CategoryDetailPage;
