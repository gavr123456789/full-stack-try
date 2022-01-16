import { useStore } from "effector-react";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { $counter, Counter } from "../features";



const Home: FC = (): JSX.Element => {
  const counter = useStore($counter)
  return (
    <>
    <h1>Home</h1>
    <p>Current count: {counter}</p>
    <Link to="/count" >Go to count page</Link>
    
    </>
  );
};

export default Home;
