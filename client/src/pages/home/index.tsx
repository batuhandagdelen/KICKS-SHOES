import { type FC } from "react";
import Hero from "./hero";
import List from "./list";
import Title from "./title";
const Home: FC = () => {
  return (
    <div>
      <Hero />
      <Title />
      <List />
    </div>
  );
};

export default Home;
