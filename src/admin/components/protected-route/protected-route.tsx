import { useSelector } from "services/store/store"
import { ProtectedRouteProps } from "./type"
import { userSelector } from "features/userSlice/userSlice"
import { Navigate, useLocation } from "react-router-dom"
import { PreloaderUI } from "components/ui/preloader-ui/preloader"

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ onlyUnAuth, component }) => {
  const { isAuthenticated, user } = useSelector(userSelector)
  const location = useLocation()

  if (!isAuthenticated === undefined) {
    return <PreloaderUI />
  }

  if (!isAuthenticated && location.pathname !== "/admin/") {
    return <Navigate to="/admin/" state={{ from: location }} replace/>;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from?.pathname || "/admin";
    return <Navigate to={from} replace/>;
  }

  return <>{component}</>
}

export const OnlyAuth = ProtectedRoute
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <ProtectedRoute onlyUnAuth component={component} />
)