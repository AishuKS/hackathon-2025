import { useEffect, useState } from 'react';
import { getFoodListings } from '../api/food';

const FoodPage = () => {
  const [food, setFood] = useState<{ id: number; item: string; status: string }[]>([]);

  useEffect(() => {
    getFoodListings().then(setFood).catch(console.error);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🍱 Available Food Listings</h2>
      <div className="row">
        {food.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.item}</h5>
                <p className="card-text">Status: {item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
