const CategoryForm = ({ fetchCategories }) => {
  return (
    <form>
      <input type="text" placeholder="Category name..."></input>
      <button>Add Category</button>
    </form>
  );
};

export default CategoryForm;
