import { useSelector } from "services/store/store"
import { ProtectedRouteProps } from "./type"
import { userSelector } from "features/userSlice/userSlice"
import { Navigate, useLocation } from "react-router-dom"

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ onlyUnAuth, component }) => {
  const { isAuthenticated, user } = useSelector(userSelector)
  const location = useLocation()

  if (!isAuthenticated && location.pathname !== "/admin/signin") {
    return <Navigate to="/admin/signin" state={{ from: location }} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/admin/signin" />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from?.pathname || "/admin";
    return <Navigate to={from} />;
  }

  return <>{component}</>
}

export const OnlyAuth = ProtectedRoute
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <ProtectedRoute onlyUnAuth component={component} />
)