import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/BookStore/GetBookTypes'
        );
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="container mt-3">
      <h5>Book Types</h5>
      <div className="row">
        {categories.map((c) => (
          <div key={c} className="col-12 d-flex align-items-center mb-2">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c} className="mb-0">{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
