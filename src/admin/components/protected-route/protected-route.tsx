import { useDispatch, useSelector } from "services/store/store"
import { ProtectedRouteProps } from "./type"
import { initializeAuth, userSelector } from "features/userSlice/userSlice"
import { Navigate, useLocation } from "react-router-dom"
import { PreloaderUI } from "components/ui/preloader-ui/preloader"
import { useEffect } from "react"

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ onlyUnAuth, component }) => {
  const { isAuthenticated, user, loading } = useSelector(userSelector)
  const location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch])

  if (loading) {
    return <PreloaderUI />
  }
  

  if (!isAuthenticated && location.pathname !== "/admin/") {
    return <Navigate to="/admin/" state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from?.pathname || "/dashboard";
    return <Navigate to={from} replace />;
  }

  return <>{component}</>
}

export const OnlyAuth = ProtectedRoute
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }) => (
  <ProtectedRoute onlyUnAuth component={component} />
)