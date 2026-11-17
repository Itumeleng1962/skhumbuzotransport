import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { LocationProvider } from "@/lib/location.tsx"
import { PublicLayout } from "@/components/layout/PublicLayout.tsx"
import { AboutPage } from "@/pages/AboutPage.tsx"
import { ContactPage } from "@/pages/ContactPage.tsx"
import { FleetPage } from "@/pages/FleetPage.tsx"
import { HomePage } from "@/pages/HomePage.tsx"
import { LoginPage } from "@/pages/LoginPage.tsx"
import { NotFoundPage } from "@/pages/NotFoundPage.tsx"
import { PortalPreviewPage } from "@/pages/PortalPreviewPage.tsx"
import { SafetyPage } from "@/pages/SafetyPage.tsx"
import { ServicesPage } from "@/pages/ServicesPage.tsx"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <BrowserRouter>
          <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="fleet" element={<FleetPage />} />
            <Route path="safety" element={<SafetyPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          {/* Dedicated Full-Screen Split Auth Pages without Header / Footer */}
          <Route path="login" element={<LoginPage role="admin" />} />
          <Route path="signup" element={<LoginPage role="parent" />} />
          <Route path="parent/login" element={<LoginPage role="parent" />} />
          <Route path="driver/login" element={<LoginPage role="driver" />} />
          <Route path="admin/login" element={<LoginPage role="admin" />} />
          <Route path="admin/*" element={<PortalPreviewPage role="admin" />} />
          <Route path="parent/*" element={<PortalPreviewPage role="parent" />} />
          <Route path="driver/*" element={<PortalPreviewPage role="driver" />} />
        </Routes>
      </BrowserRouter>
    </LocationProvider>
  </QueryClientProvider>
  )
}
