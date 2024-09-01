// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';

function App() {
  return (
<Routes>
  <Route path="/signup" element={<SignUp />} />
  {/* Other routes */}
</Routes>
  );
}

export default App;
