import { LogOut, Megaphone, X } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'
import { NavLinks } from './Navbar';

interface GetField {
  funcHandleLogout: () => void;
  isSdOpen: boolean;
  stIsSdOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ funcHandleLogout, isSdOpen, stIsSdOpen }: GetField) => {
  return (
      <div className={`sidebar-main bg-white border-end d-flex flex-column p-4  ${isSdOpen ? 'sidebar-open' : ''}`}>
        <div className="d-flex align-items-center justify-content-between mb-5 ps-2">
          <div className="d-flex align-items-center">
            <div className="rounded-3 p-2 me-2 text-white bg-green-primary">
              <Megaphone size={24} />
            </div>
            <h4 className="mb-0 fw-bold text-dark">E-Mading</h4>
          </div>
          <button className="btn d-xl-none border-0 text-muted" onClick={() => stIsSdOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-grow-1">
          <NavLinks />
        </nav>

        <div className="mt-auto border-top pt-4">
          <button onClick={funcHandleLogout} className="btn btn-link text-danger text-decoration-none d-flex align-items-center gap-3 w-100 px-3 py-2 fw-bold">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
  );
};