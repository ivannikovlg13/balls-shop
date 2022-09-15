import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const FullBall: React.FC = () => {
  const star = require('../assets/img/star.svg');
  const { id } = useParams();
  const [ball, setBall] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
    country: string;
    rating: number;
  }>();
  React.useEffect(() => {
    const fetchBall = async () => {
      try {
        const { data } = await axios.get('https://630e35b2109c16b9abf71c53.mockapi.io/items/' + id);
        setBall(data);
        console.log(data);
      } catch (error) {
        alert('Failed to display the ball');
      }
    };
    fetchBall();
  }, []);
  if (!ball) {
    return <>Loading...</>;
  }
  return (
    <div className="container fullBall">
      <img className="fullBall-img" src={ball.imageUrl} alt="ball" />
      <div className="fullBall-info">
        <h4 className="fullBall-name">{ball.name}</h4>
        <div className="fullBall-price">
          <span>price : </span>
          <b>{ball.price}$</b>
        </div>
        <div className="fullBall-price">
          <span>producing country : </span>
          <b>{ball.country}</b>
        </div>
        <div className="fullBall-price">
          <span>rating:</span>
          <b>{ball.rating}</b>
          <img src={star} alt="star" />
        </div>
        <Link to="/" className="button button--black">
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
};

export default FullBall;
