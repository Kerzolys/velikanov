import { Media } from "admin/components/media/media";
import { AdminNavbarUI } from "admin/components/ui/admin-navbar-ui/admin-navbar-ui";


export const AdminMedia = () => (
  <>
    <AdminNavbarUI isHomePage={false} />
    <Media />
  </>
)