import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullBall = React.lazy(() => import(/* webpackChunkName: "FullBall" */ './pages/FullBall'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="ball/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullBall />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
