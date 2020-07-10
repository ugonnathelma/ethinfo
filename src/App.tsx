import React from "react";
import { ThemeProvider } from "styled-components";

import Form from "./components/organisms/Form";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Form />
    </ThemeProvider>
  );
}

export default App;
