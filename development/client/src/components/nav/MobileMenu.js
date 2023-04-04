import Modal from "../UI/Modal/Modal";
import { useState } from "react";

const MobileMenu = (props) => {
  const [showUserOptions, setShowUserOptions] = useState(false);

  const loginHandler = () => {
    setShowUserOptions(true);
  };

  const userRollHandler = (e) => {
    setShowUserOptions(false);
    props.userRollHandler(e);
    props.onClose();
  };
  return (
    <Modal onClose={props.onClose}>
      <div className="flex flex-col">
        <div className="flex flex-row justify-end">
          <div>
            <i onClick={props.onClose} className="bi bi-x text-4xl"></i>
          </div>
        </div>
        <div className="px-4">
          {!showUserOptions && (
            <div className="flex flex-col space-y-8 w-full pb-10">
              {/* User photo */}
              <div className="mx-auto w-24 h-24">
                <img
                  src={props.userInfo}
                  alt="User"
                  className="w-full h-full rounded-full object-cover
            "
                ></img>
              </div>
              <button type="button">LOGI SISSE</button>

              <button
                onClick={props.login}
                className="flex-1 w-full mx-auto px-14 py-2 border border-black uppercase shadow-md"
                type="button"
                name="Login Google"
              >
                Google konto
              </button>

              <button
                onClick={props.logOut}
                className="flex-1 w-full mx-auto px-14 py-2 border border-black uppercase shadow-md"
                type="button"
                name="Logout Google"
              >
                Log out
              </button>
              {props.userRoll === "LOGI SISSE" && (
                <button
                  onClick={loginHandler}
                  className="flex-1 w-full mx-auto px-14 py-2 border border-black uppercase shadow-md"
                >
                  Logi Sisse
                </button>
              )}
              {props.userRoll !== "LOGI SISSE" && (
                <button
                  onClick={userRollHandler}
                  type="button"
                  name="logout"
                  className="flex-1 w-full mx-auto px-14 py-2 border border-black uppercase shadow-md"
                >
                  Logi välja
                </button>
              )}
              <a
                className="flex-1 w-full mx-auto px-14 py-2 border border-black text-center uppercase shadow-md"
                target="_blank"
                rel="noopener noreferrer"
                href="https://start.hk.tlu.ee/sahtelbeta/sahtel/index.php"
              >
                Sahtel
              </a>
              <a
                className="flex-1 w-full mx-auto px-14 py-2 border border-black text-center uppercase shadow-md"
                target="_blank"
                rel="noopener noreferrer"
                href="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              >
                Riiul
              </a>
            </div>
          )}
          {showUserOptions && (
            <div className="flex flex-col space-y-8 w-full pb-10 pt-3">
              <button
                onClick={userRollHandler}
                type="button"
                name="admin"
                className="flex-1 w-[70vw] mx-auto px-14 py-2 border border-black uppercase shadow-md"
              >
                Haldus
              </button>
              <button
                onClick={userRollHandler}
                type="button"
                name="lecturer"
                className="flex-1 w-[70vw] mx-auto px-14 py-2 border border-black uppercase shadow-md"
              >
                Õppejõud
              </button>
              <button
                onClick={userRollHandler}
                type="button"
                name="student"
                className="flex-1 w-[70vw] mx-auto px-14 py-2 border border-black uppercase shadow-md"
              >
                Õpilane
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MobileMenu;
