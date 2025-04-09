import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Pages
// import Homepage from './pages/Homepage';
// import Pricing from './pages/Pricing';
// import Product from './pages/Product';
// import Login from './pages/Login';
// import AppLayout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound';

// Optimizing Bundle Size With Code Splitting using (Lazy loading) on Pages (Splitting the JS bundle into multiple files)
const Homepage = lazy(() => import('./pages/Homepage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Product = lazy(() => import('./pages/Product'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

// Components
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import ProtectedRoute from './pages/ProtectedRoute';
import SpinnerFullPage from './components/SpinnerFullPage';

// Context API
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';

function App() {
	return (
		<AuthProvider>
			<CitiesProvider>
				<BrowserRouter>
					{/* Suspense API (Component) for Lazy loading with SpinnerFullPage */}
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path='pricing' element={<Pricing />} />
							<Route path='product' element={<Product />} />
							<Route path='login' element={<Login />} />
							<Route
								path='app'
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
								{/* Nested routs */}
								<Route
									index
									element={<Navigate replace to='cities' />}
								/>
								<Route path='cities' element={<CityList />} />
								{/* Dynamic routes (Storing state in the url) */}
								<Route path='cities/:id' element={<City />} />

								<Route path='countries' element={<CountryList />} />
								<Route path='form' element={<Form />} />
							</Route>
							<Route path='*' element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</CitiesProvider>
		</AuthProvider>
	);
}

export default App;
