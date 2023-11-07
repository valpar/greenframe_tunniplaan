import SideModal from "../UI/Modal/SideModal";
import { useState } from "react";

const MobileMenu = (props) => {
  //const [showUserOptions, setShowUserOptions] = useState(false);
  const {
    onClose,
    loginHandler,
    loginMessage,
    loginInfo,
    userPicture,
    userAdminHandler,
    showMobileMenu,
    onUsersManagement,
    usersListOpen,
    admin,
  } = props;

  /*
  const loginHandler = () => {
    setShowUserOptions(true);
  };

  const userRollHandler = (e) => {
    setShowUserOptions(false);
    props.userRollHandler(e);
    onClose();
  };
*/
  const usersManagementHandler = () => {
    onUsersManagement();
    onClose();
  };

  return (
    <SideModal onHidden={showMobileMenu}>
      <div className={`flex flex-col`}>
        <div className="px-4 pt-8">
      {/* {!showUserOptions && ( */}
            <div className="flex flex-col space-y-8 w-full pb-10">
              {/* User photo */}
              <div className="mx-auto w-24 h-24">
                <img
                  src={userPicture}
                  alt="User"
                  className="w-full h-full rounded-full object-cover
            "
                ></img>
              </div>

              <p className="uppercase text-center">
                {loginInfo?.user?.firstName
                  ? loginInfo?.user?.firstName
                  : ""}
              </p>

              <button
                  onClick={loginHandler}
                  className="btn-m-menu"
                  type="button"
                  name="Login Google"
                >
                  {loginMessage}
              </button>
             

              <a
                className="btn-m-menu text-center"
                target="_blank"
                rel="noopener noreferrer"
                href="https://start.hk.tlu.ee/sahtelbeta/sahtel/index.php"
              >
                Sahtel
              </a>
              <a
                className="btn-m-menu text-center"
                target="_blank"
                rel="noopener noreferrer"
                href="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              >
                Riiul
              </a>
            </div>
   {/*    )}  */}
        </div>
      </div>
    </SideModal>
  );
};

export default MobileMenu;
