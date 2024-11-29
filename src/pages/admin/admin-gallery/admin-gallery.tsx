import { Gallery } from "admin/components/gallery/gallery"
import { AdminNavbarUI } from "admin/components/ui/admin-navbar-ui/admin-navbar-ui"

export const AdminGallery = () => {
  return (
    <>
      <AdminNavbarUI isHomePage={false} />
      <Gallery />
    </>
  )
}