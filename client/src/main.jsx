import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/home'
import SpeakersPage from './app/speakers/page'
import AboutPage from './app/about/page'
import BookingPage from './app/booking/page.jsx'
import PaymentPage from './app/payment/page.jsx'
import PaymentSuccessPage from './app/payment-success/page.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="speakers" element={<SpeakersPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)