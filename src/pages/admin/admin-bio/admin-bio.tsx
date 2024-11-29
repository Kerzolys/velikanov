import { Bio } from "admin/components/bio/bio"
import { AdminNavbarUI } from "admin/components/ui/admin-navbar-ui/admin-navbar-ui"

export const AdminBio = () => (
  <div>
    <AdminNavbarUI isHomePage={false} />
    <Bio />
  </div>
)