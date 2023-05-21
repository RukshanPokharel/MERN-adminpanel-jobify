import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register, Landing, Error, ProtectedRoute } from './pages'
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  Geography
} from './pages/dashboard'
import { useAppContext } from './context/appContext'
import { useMemo } from 'react';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from '@mui/material';
import { themeSettings } from "./theme";
import Blog from './pages/dashboard/Blog';

function App() {
  const { mode } = useAppContext();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Stats />} />
              <Route path='all-jobs' element={<AllJobs />} />
              <Route path='add-job' element={<AddJob />} />
              <Route path='profile' element={<Profile />} />
              <Route path='geography' element={<Geography />} />
              <Route path='blog' element={<Blog />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/landing' element={<Landing />} />
            <Route path='*' element={<Error />} />
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
