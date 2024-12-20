import { AuthProvider } from "@/hooks/AuthProvider"
import { UrlProvider } from "@/hooks/UrlProvider"
import AppRoutes from './Routes'

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNDY2NjQ5MywiZXhwIjoxNzM0NjcwMDkzfQ.VPNz7A7UI9RRuJBg8yvLGdxV31CC2be6bNZoh7pdlME';

// const test = () => {
//   fetch("http://localhost:5000/api/batik", {
//     method: "GET",
//     headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//     }
// })
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error("CORS might not be configured correctly");
//         }
//         return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));
// }

function App() {
  // test();
  return (
    <>
      <UrlProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </UrlProvider>
    </>
  )
}

export default App
