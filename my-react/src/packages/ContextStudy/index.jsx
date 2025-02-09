import Section from "./Section";
import Heading from "./Heading";
import { useState } from "react";
import { StrContext } from "./LevelContext";

export default function Page() {
  const [str, setStr] = useState('');
  return (
    <StrContext.Provider value={str}>
      <input onChange={(e) => setStr(e.target.value)}></input>
      <Section>
        <Heading>Title</Heading>
        <Section>
          <Heading>Heading</Heading>
          <Section>
            <Heading>Sub-heading</Heading>
            <Section>
              <Heading>Sub-sub-heading</Heading>
            </Section>
          </Section>
        </Section>
      </Section>
    </StrContext.Provider>
  );
}