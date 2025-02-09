import { LevelContext } from "./LevelContext.js";
import { useContext } from "react";

function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section>
      <LevelContext.Provider value={level + 1}>
        { children }
      </LevelContext.Provider>
    </section>
  )
}

export default Section;