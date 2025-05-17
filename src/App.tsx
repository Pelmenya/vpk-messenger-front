import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import "./app.css"
import { routes } from "./app/routing"

export const App = () => (
  <div className="app">
    <HashRouter>
      <Routes>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.Component />}
          >
            {route.children?.map(child => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={<child.Component />}
                />
              ))}
          </Route>
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  </div>
)
