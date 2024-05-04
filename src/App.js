import { useUserContext } from "./contexts";
import Loading from "./pages/loading";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { publicUserRoutes } from "./routes/publicUserRoutes";
import { loggedInUserRoutes } from "./routes/loggedInUserRoutes";

function App() {
  const { currentUser, isPublicUser, userDetailLoading } = useUserContext();
  
  if (userDetailLoading) {
    return (
      <Routes>
        <Route path="*" element={<Loading />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {isPublicUser
        ? publicUserRoutes.map((item) => (
            <Route key={item.route} path={item.route} element={<item.component />} />
          ))
        : currentUser
        ? loggedInUserRoutes.map((item) => (
            <Route key={item.route} path={item.route} element={<item.component />} />
          ))
        : <Route path="*" element={<div>User detail not found</div>} />
      }
    </Routes>
  );
}

export default App;
