import { Container } from "neus-ui";
import { EnergyCalculator } from "./EnergyCalculator";

export default function App() {
  return (
    <main className="energy-page">
      <Container>
        <EnergyCalculator />
      </Container>
    </main>
  );
}
