import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateListingPage from './pages/CreateListingPage'
import ListingAmenitiesPage from './pages/ListingAmenitiesPage'
import ListingAdditionalPage from './pages/ListingAdditionalPage'
import ListingPhotosPage from './pages/ListingPhotosPage'
import ListingPricingPage from './pages/ListingPricingPage'
import ListingPreviewPage from './pages/ListingPreviewPage'
import ListingRulesPage from './pages/ListingRulesPage'
import ListingsPage from './pages/ListingsPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/listings/new" element={<CreateListingPage />} />
        <Route path="/listings/new/photos" element={<ListingPhotosPage />} />
        <Route path="/listings/new/amenities" element={<ListingAmenitiesPage />} />
        <Route path="/listings/new/rules" element={<ListingRulesPage />} />
        <Route path="/listings/new/additional" element={<ListingAdditionalPage />} />
        <Route path="/listings/new/pricing" element={<ListingPricingPage />} />
        <Route path="/listings/new/preview" element={<ListingPreviewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
