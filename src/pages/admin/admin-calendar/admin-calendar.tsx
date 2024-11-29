import { Calendar } from "admin/components/calendar/calendar"
import { AdminNavbarUI } from "admin/components/ui/admin-navbar-ui/admin-navbar-ui"

export const AdminCalendar = () => {
  return (
    <>
      <AdminNavbarUI isHomePage={false} />
      <Calendar />
    </>
  )
}