import 'bootstrap/dist/css/bootstrap.css'
import '../pages/styles.css'
import { AuthProvider } from '../src/context/AuthContext'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}