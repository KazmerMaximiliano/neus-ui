import "./css/app.css";
import { ThemeProvider } from "./providers";

export const App = () => {
  return (
    <ThemeProvider>
      <div>App</div>
    </ThemeProvider>
  );
};
