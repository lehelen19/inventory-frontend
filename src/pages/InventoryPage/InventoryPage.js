import { useState, useEffect } from 'react';
import { getCategories } from '../../utilities/categories/categories-service';
import { Link } from 'react-router-dom';
import CategoryForm from '../../components/NavBar/NewCategoryForm';

const InventoryPage = () => {
  const [categories, setCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCategories = async () => {
    try {
      const foundCategories = await getCategories();
      setCategories(foundCategories);
    } catch {
      console.log('Error');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCheckDelete = () => {
    console.log('modal');
    setShowModal(true);
  };

  const handleConfirmDelete = (id) => {
    console.log(id);
  };

  const loading = () => {
    return <p>Loading categories...</p>;
  };

  const loaded = () => {
    return categories.map((category) => (
      <div key={category._id}>
        <p>{category.name}</p>
        <Link to={`/categories/${category._id}`}>Details</Link>
        <button>Edit</button>
        {showModal ? (
          <div>Modal</div>
        ) : (
          <button onClick={handleCheckDelete}>Delete</button>
        )}
      </div>
    ));
  };

  return (
    <>
      <h1>Inventory Page</h1>
      <CategoryForm fetchCategories={fetchCategories} />
      {categories ? loaded() : loading()}
    </>
  );
};

export default InventoryPage;
