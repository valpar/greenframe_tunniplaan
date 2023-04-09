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
                className="btn-m-menu"
                type="button"
                name="Login Google"
              >
                Google konto
              </button>

              <button
                onClick={props.logOut}
                className="btn-m-menu"
                type="button"
                name="Logout Google"
              >
                Log out
              </button>
              {props.userRoll === "LOGI SISSE" && (
                <button onClick={loginHandler} className="btn-m-menu">
                  Logi Sisse
                </button>
              )}
              {props.userRoll !== "LOGI SISSE" && (
                <button
                  onClick={userRollHandler}
                  type="button"
                  name="logout"
                  className="btn-m-menu"
                >
                  Logi välja
                </button>
              )}
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
          )}
          {showUserOptions && (
            <div className="flex flex-col space-y-8 w-full pb-10 pt-3">
              <button
                onClick={userRollHandler}
                type="button"
                name="admin"
                className="btn-m-menu"
              >
                Haldus
              </button>
              <button
                onClick={userRollHandler}
                type="button"
                name="lecturer"
                className="btn-m-menu"
              >
                Õppejõud
              </button>
              <button
                onClick={userRollHandler}
                type="button"
                name="student"
                className="btn-m-menu"
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
