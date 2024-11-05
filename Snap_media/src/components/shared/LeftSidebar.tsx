import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queryAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import chat from "../../../public/assets/images/logo.png"

const LeftSidebar = () => {

  const { pathname } = useLocation();

  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess])

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          {/* <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          /> */}
          <img src={chat} alt="logo" height={170} width={200} />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-teal-600">@{user.username}</p>
          </div>
        </Link>


        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-teal-900"
                  }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white
                      // ${!isActive && "img-teal-500"}
                     ${isActive && "invert-white"}
                     `}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex gap-4" onClick={() => signOut()}>
        <Button variant="ghost" className="shad-button_ghost">
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;