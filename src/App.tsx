import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import CataloguePage from './pages/CataloguePage';
import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <Router basename="/imbewu-demo">
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/catalogue"
              element={
                <ProtectedRoute>
                  <Header />
                  <CataloguePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Header />
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;