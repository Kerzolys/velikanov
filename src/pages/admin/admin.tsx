import { SignIn } from "admin/components/sign-in/sign-in";
import { SignUp } from "admin/components/sign-up/sign-up";
import { ButtonUI } from "admin/components/ui/button-ui/button-ui";
import { logout, userSelector } from "features/userSlice/userSlice";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "services/store/store";

export const Admin = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(userSelector)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {!isAuthenticated ? <SignIn /> : <h1>welcome</h1>}
      <NavLink to='/admin/calendar'>
        <ButtonUI type='button' buttonText="Calendar" />
      </NavLink>
      <NavLink to='/admin/about'>
        <ButtonUI type='button' buttonText="Bio" />
      </NavLink>
      <NavLink to='/admin/media'>
        <ButtonUI type='button' buttonText="Media" />
      </NavLink>
      <NavLink to='/admin/gallery'>
        <ButtonUI type='button' buttonText="Gallery" />
      </NavLink>
      <ButtonUI type='button' buttonText="Log out" onClick={handleLogout}/>
    </>
  )
}
