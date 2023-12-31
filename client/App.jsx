import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppProvider from './utils/AppProvider';
import CardProvider from './utils/CardProvider';
import { Header, ProtectedRoute } from './components';
import { HomePage, AuthPage, Logout, ViewCards, RulesPage, AllView, CardShop, DeckBuilder, GameBoard } from './pages/'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';



<navbar className="js"></navbar>;

export default function App(){
  return (
    <AppProvider>
      <CardProvider>
        <BrowserRouter>
          <Header />
          <div className={"headerSpacer"}></div>
          <div className="container pt-5">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/allview" element={
                <ProtectedRoute>
                  <AllView />
                </ProtectedRoute>
              }/>
              <Route path="/cardshop" element={
                <ProtectedRoute>
                  <CardShop />
                </ProtectedRoute>
              }/>
              <Route path="/viewcards" element={
                <ProtectedRoute>
                  <ViewCards />
                </ProtectedRoute>
              }/>
              <Route path="/deckbuilder" element={
                <ProtectedRoute>
                  <DeckBuilder />
                </ProtectedRoute>
              }/>
              <Route path="/gameboard" element={
                <ProtectedRoute>
                  <GameBoard />
                </ProtectedRoute>
              }/>
              <Route path="/logout" element={<Logout />} />
            </Routes>

          </div>
        </BrowserRouter>
      </CardProvider>
    </AppProvider>
  )
}
