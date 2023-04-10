import { ReactComponent as Logo } from "../assets/logo/HK-est.svg";

export const Header = (props) => {
  return (
    <header className="flex flex-col fixed pb-1 lg:pb-0 top-0 left-1/2 -translate-x-1/2 max-w-6xl w-full z-10 bg-white">
      <div className="flex items-center lg:items-end justify-between py-4 px-4 lg:py-0 lg:pt-4">
        {/* Logo */}
        <div className="w-40 h-full lg:w-80 lg:mb-4">
          <a
            href="https://www.tlu.ee/haapsalu"
            title="Avaleht"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo />
          </a>
        </div>
        <div className="flex flex-row space-x-12">
          {/* Desktop menu */}
          <div className="hidden lg:flex flex-row justify-end items-end h-full font-serif mt-16">
            <div className="w-[0.1rem] h-7 bg-collegeGreen rotate-[15deg] mr-2 ml-3"></div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://start.hk.tlu.ee/sahtelbeta/sahtel/index.php"
              className="text-xl"
            >
              <i>SAHTEL</i>
            </a>
            <div className="w-[0.1rem] h-7 bg-collegeGreen rotate-[15deg] mr-2 ml-3"></div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="text-xl"
            >
              <i>RIIUL</i>
            </a>
          </div>
          {/* Desktop login */}
          <div className="hidden relative lg:flex flex-col justify-end mb-1">
            <div className="mt-4 w-28 cursor-pointer" onClick={props.onClick}>
              <div className="mx-auto w-12 h-12">
                <img
                  src={props.userPicture}
                  alt="User"
                  className="w-full h-full rounded-full object-cover"
                ></img>
              </div>
              {/* <div className="text-lg mx-auto text-center">{props.userRoll}</div> */}
              <div className="text-lg mx-auto text-center">
                {props.loginInfo?.user?.firstName
                  ? props.loginInfo?.user?.firstName
                  : "Logi sisse"}
              </div>
            </div>

            {props.showUsersModal && (
              <div className="absolute top-28 -right-4">
                <div className="relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-white border-l rounded-br-full border-t border-borderGray"></div>
                  <div className="flex flex-col justify-around items-center p-4 space-y-2 border border-borderGray  green-shadow bg-white w-44">
                    <p className="uppercase text-center">{props.userRoll}</p>
                    {!props.loginInfo && (
                      <button
                        onClick={props.login}
                        className="btn-period"
                        type="button"
                        name="Login Google"
                      >
                        Google konto
                      </button>
                    )}

                    {props.loginInfo && (
                      <button
                        onClick={props.logOut}
                        className="btn-period"
                        type="button"
                        name="Logout Google"
                      >
                        Log out
                      </button>
                    )}

                    {/* <button
                      onClick={props.userRollHandler}
                      className="btn-period"
                      type="button"
                      name="admin"
                    >
                      Haldus
                    </button>
                    <button
                      onClick={props.userRollHandler}
                      className="btn-period"
                      type="button"
                      name="lecturer"
                    >
                      Õppejõud
                    </button>
                    <button
                      onClick={props.userRollHandler}
                      className="btn-period"
                      type="button"
                      name="student"
                    >
                      Õpilane
                    </button>
                    <button
                      onClick={props.userRollHandler}
                      className="btn-period"
                      type="button"
                      name="logout"
                    >
                      Logi välja
                    </button> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:hidden flex flex-row w-40 justify-end space-x-7 pr-2">
          {/* Mobile schedule add */}
          {props.admin && !props.showDesktopFilters && (
            <i
              className={`bi bi-plus-lg text-3xl pt-[0.1rem] ${
                props.scrollY < 766 && props.showSchedule
                  ? "text-borderGray"
                  : ""
              }`}
              onClick={props.addScheduleHandler}
            ></i>
          )}
          {/* Mobile filters */}
          <i
            className={`bi bi-sliders text-2xl pt-1 ${
              props.scrollY < 766 && props.showMobileFilters
                ? "text-borderGray"
                : ""
            }`}
            onClick={props.mobileFiltersHandler}
          ></i>
          {/* Hamburger menu */}
          <i
            className="bi bi-list text-4xl"
            onClick={props.mobileMenuHandler}
          ></i>
        </div>
      </div>

      <div
        className={`w-full h-[0.2rem] bg-[#6c8298] border-solid border-1 border-[#d4d4d4]`}
      />
    </header>
  );
};
