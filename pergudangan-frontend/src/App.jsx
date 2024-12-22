import { AuthProvider } from "@/hooks/AuthProvider"
import { UrlProvider } from "@/hooks/UrlProvider"
import AppRoutes from './Routes'

function App() {
  // test();
  return (
    <>
      <UrlProvider>
        <AuthProvider>
          <AppRoutes  />
        </AuthProvider>
      </UrlProvider>
    </>
  )
}

export default App
