import React, { useState, useEffect, useCallback } from "react";
import useAxios from "../hooks/useAxios";

import * as dateService from "../utils/Format/Date";

import ScheduleFilters from "../components/searchFilters/ScheduleFilters";
import ScheduleAddition from "../components/scheduleAddition/ScheduleAddition";
import Table from "../components/UI/Table/Table";
// import { ReactComponent as Logo } from "../assets/logo/HK-est.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calculateSemesterDate } from "../utils/Calculate/Semester";
import GoTopButton from "../components/UI/Button/GoTopButton";
import MobileMenu from "../components/nav/MobileMenu";
import { Spinner } from "../components/UI/Spinner";
import content from "../assets/content/content.json";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRef } from "react";
import { AddScheduleButton } from "../components/UI/Button/AddScheduleButton";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { addDays, subDays } from "date-fns";
import { Header } from "../components/Header";

const Home = () => {
  const [scheduleRequestParams, setScheduleRequestParams] = useState({
    startDate: new Date(1).toISOString(),
    endDate: new Date(1).toISOString(),
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newOccurenceAdded, setNewOccurenceAdded] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [hasServerError, setHasServerError] = useState(undefined);

  const [loginInfo, setLoginInfo] = useState([]); // Sisselogitud kasutaja intentifitseerimiseks backis.

  const { response, isLoading, error } = useAxios(
    {
      method: "get",
      url: `/schedule/${scheduleRequestParams.startDate}/${scheduleRequestParams.endDate}`,
      headers: { Authorization: `Bearer ${loginInfo?.token}` },
    },
    newOccurenceAdded
  );

  const [dropdownsSelection, setDropdownSelection] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [userLecturer, setUserLecturer] = useState(false);
  const [userStudent, setUserStudent] = useState(false);
  const [addSchedule, setAddSchedule] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const [notScheduled, setNotScheduled] = useState("");
  const filtersRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const work_Data = useCallback(() => {
    setScheduleLoading(isLoading);
    setHasServerError(error?.message ? error.message : undefined);
    console.log(error);

    if (!isLoading && response !== undefined) {
      let schedule = response.schedule;
      schedule.forEach(function (o) {
        Object.keys(o).forEach(function (k) {
          if (o[k] === null) {
            o[k] = "";
          }
        });
      });
      setData(schedule);
      setFilteredData(schedule);
    }
  }, [isLoading, response, error]);

  useEffect(() => {
    work_Data();
  }, [work_Data]);

  const dropdownController = (data, obj) => {
    let filteredObj = data.filter(
      (e) => e[obj.flatMap(Object.keys)[0]] === undefined
    );
    if (
      obj[0].value === "courseCode" ||
      obj[0].value === "subject" ||
      obj[0].value === "lecturer" ||
      obj[0].value === "room"
    ) {
      return [...data.filter((e) => e[obj[0].value] === undefined)];
    }
    return [...obj, ...filteredObj];
  };

  const scheduleFilter = (filterObj, rawData, type) => {
    let filterType;
    if (type === "courses") filterType = "courseCode";
    else if (type === "lecturers") filterType = "lecturer";
    else if (type === "rooms") filterType = "room";
    else {
      filterType = type;
    }
    let filteredObjects = filterObj.filter((e) => e[filterType]);
    let objectKeys = filteredObjects.flatMap(Object.keys);
    let objectValues = filteredObjects.flatMap(Object.values);
    let filteredeData = [];
    if (type === "courses") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter((e) => {
            if (e.courses) {
              return e.courses
                .flatMap(Object.values)
                .some((el) => el === objectValues[i]);
            }
            return false;
          })
        );
      }
    }
    if (type === "lecturers") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter((e) => {
            if (e.lecturers) {
              let fullName = e.lecturers.map(
                (e) => `${e.firstName} ${e.lastName}`
              );
              return fullName.some((el) => el === objectValues[i]);
            }
            return false;
          })
        );
      }
    }
    if (type === "rooms") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter((e) => {
            if (e.rooms) {
              return e.rooms
                .flatMap(Object.values)
                .some((el) => el === objectValues[i]);
            }
            return false;
          })
        );
      }
    }
    if (type === "subject") {
      for (let i = 0; i < objectValues.length; i++) {
        filteredeData.push(
          ...rawData.filter(
            (e) => e.subject[objectKeys[i]].trim() === objectValues[i]
          )
        );
      }
    }

    if (filterType === "startTime") {
      const reverseDate = (str) => {
        return str.split(".").reverse().join("-");
      };
      filteredeData.push(
        ...rawData.filter((e) => {
          let time1 = dateService.formatMilliseconds(
            reverseDate(dateService.formatDate(e[objectKeys[0]]))
          );
          let time2 = dateService.formatMilliseconds(
            reverseDate(dateService.formatDate(objectValues[0]))
          );
          let time3 = dateService.formatMilliseconds(
            reverseDate(dateService.formatDate(objectValues[1]))
          );
          return time1 >= time2 && time1 <= time3;
        })
      );
    }

    filteredeData = filteredeData.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    return filteredeData;
  };

  const dataFilterHandler = (dropdownValues) => {
    if (dropdownValues[0]?.startTime && dropdownValues[0]?.endTime) {
      setScheduleRequestParams({
        startDate: new Date(dropdownValues[0].startTime).toISOString(),
        endDate: new Date(dropdownValues[0]?.endTime).toISOString(),
      });

      setNewOccurenceAdded((prevState) => (prevState = !prevState));
    }
    setDropdownSelection((prevState) => {
      return [...dropdownController(prevState, dropdownValues)];
    });
  };

  useEffect(() => {
    const hasStartTime = dropdownsSelection.find((o) => o.startTime);
    const hasCourse = dropdownsSelection.find((o) => o.courseCode);
    const hasSubject = dropdownsSelection.find((o) => o.subject);
    const hasLecturer = dropdownsSelection.find((o) => o.lecturer);
    const hasRoom = dropdownsSelection.find((o) => o.room);
    if (hasCourse) {
      setFilteredData([...scheduleFilter(dropdownsSelection, data, "courses")]);
    }
    if (hasSubject) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse ? prevState : data,
            "subject"
          ),
        ];
      });
    }
    if (hasLecturer) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasSubject ? prevState : data,
            "lecturers"
          ),
        ];
      });
    }
    if (hasRoom) {
      setFilteredData((prevState) => {
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasLecturer || hasSubject ? prevState : data,
            "rooms"
          ),
        ];
      });
    }
    if (hasStartTime) {
      setFilteredData((prevState) => {
        // console.log(scheduleFilter(dropdownsSelection, data, "startTime"));
        return [
          ...scheduleFilter(
            dropdownsSelection,
            hasCourse || hasLecturer || hasSubject || hasRoom
              ? prevState
              : data,
            "startTime"
          ),
        ];
      });
    }
    if (dropdownsSelection.length === 0) {
      setFilteredData([...data]);
    }
  }, [data, dropdownsSelection]);

  filteredData.sort(
    (objA, objB) =>
      Number(new Date(objA.startTime)) - Number(new Date(objB.startTime))
  );

  const userRollHandler = (event) => {
    event.preventDefault();
    // if (event.target.name === "admin") {
    //   setAdmin(true);
    //   setUserStudent(false);
    //   setUserLecturer(false);
    // }
    // if (event.target.name === "lecturer") {
    //   setAdmin(false);
    //   setUserStudent(false);
    //   setUserLecturer(true);
    // }
    // if (event.target.name === "student") {
    //   setAdmin(false);
    //   setUserLecturer(false);
    //   setUserStudent(true);
    // }
    // if (event.target.name === "logout") {
    //   setAdmin(false);
    //   setUserLecturer(false);
    //   setUserStudent(false);
    // }
    setShowUsersModal(false);
  };

  useEffect(() => {
    const roles = {
      admin: false,
      userLecturer: false,
      userStudent: false
    };
  
    if (loginInfo?.user?.role === "admin") {
      roles.admin = true;
    } else if (loginInfo?.user?.role === "lecturer") {
      roles.userLecturer = true;
    } else if (loginInfo?.user?.role === "student") {
      roles.userStudent = true;
    }
  
    setAdmin(roles.admin);
    setUserLecturer(roles.userLecturer);
    setUserStudent(roles.userStudent);
  }, [loginInfo]);
  




  const addScheduleHandler = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    if (window.innerWidth <= 1024 || showMobileFilters) {
      setShowMobileFilters(false);
    }
    setAddSchedule((prevState) => (prevState = !prevState));
  };

  const newOccurenceHandler = () => {
    setNewOccurenceAdded((prevState) => (prevState = !prevState));
  };

  const closeAdditionModalHandler = () => {
    setAddSchedule(false);
  };
  const showUserRollesHandler = () => {
    setShowUsersModal((prevState) => (prevState = !prevState));
  };
  const emptyFiltersHandler = () => {
    setFilteredData(data);
    const defaultDate = calculateSemesterDate(true);
    setDropdownSelection([
      {
        startDate: defaultDate[0],
        endDate: defaultDate[1],
      },
    ]);
  };
  // const userPicture = admin
  //   ? "https://images.pexels.com/photos/3790811/pexels-photo-3790811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   : userLecturer
  //   ? "https://images.pexels.com/photos/4342401/pexels-photo-4342401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //   : userStudent
  //   ? "https://images.pexels.com/photos/13180055/pexels-photo-13180055.jpeg?auto=compress&cs=tinysrgb&w=1600"
  //   : require("../assets/icons/user.png");

     const userRole = admin
    ? "HALDUR"
    : userLecturer
    ? "ÕPPEJÕUD"
    : userStudent
    ? "ÕPILANE"
    : "";
 




  const mobileMenuHandler = () => {
    setShowMobileMenu((prevState) => (prevState = !prevState));
  };

  const mobileFiltersHandler = () => {
    if (window.scrollY > 766 && showMobileFilters) {
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    } else {
      setShowMobileFilters((prevState) => (prevState = !prevState));
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
    setAddSchedule(false);
  };

  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setShowMobileFilters(true);
      setShowDesktopFilters(true);
    }
  };

  const scheduleReloadHandler = () => {
    setScheduleLoading(true);
    setHasServerError("");
    setNewOccurenceAdded((prevState) => (prevState = !prevState));
  };



  // --- Google login ---
  
  const [googleAccessToken, setGoogleAcessToken] = useState([]);
  // const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [googleProfile, setGoogleProfile] = useState([]);
  const [userPicture, setUserPicture] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (googleResponse) => {
      console.log("Login Successful:", googleResponse);
      setGoogleAcessToken(googleResponse.access_token); // selleks et seda saata backi autentimiseks
  
      axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${googleResponse.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((result) => {
        setGoogleProfile(result.data);

      })
      .catch((err) => console.log(err)); // kui google acess tokeniga ligipääs ebaõnnestus
    },
    onError: (error) => console.log("Login Failed:", error), // kui google esmasel pöördumisel juba tekkis viga
  });

  useEffect(() => {
    console.log(googleProfile);
    setUserPicture(googleProfile?.picture ?? require("../assets/icons/user.png"));
  }, [googleProfile]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setGoogleProfile(null);
    setLoginInfo(null);
    setShowUsersModal(false);
  };
  // --- Google login end --- 

  // --- Schedule login ---

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.post( 
          `googleauth`,
          null,  // edastate tühja päringu keha
          {
            headers: {
              Authorization: `Bearer ${googleAccessToken}`,
              Accept: "application/json",
            },
          }
        );
        setLoginInfo(response.data);
        setShowUsersModal(false);
        console.log("Roll: ",response.data.user.role);
      } catch (error) {
        console.log(error);
      }
    }
  
    if (googleAccessToken) {
      fetchProfile();
    }
  }, [googleAccessToken]);



  useEffect(() => {
    handleResize();
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotScheduled("Loenguid ei leitud!");
    }, 1000);
    return () => clearTimeout(timer);
  }, [filteredData]);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative container mx-auto flex max-w-6xl flex-col font-sans text-center">
      <div className="mx-auto w-full ">
        <Header
          profile={profile}
          onClick={showUserRollesHandler}
          loginInfo={loginInfo}
          userPicture={userPicture}
          showUsersModal={showUsersModal}
          login={login}
          logOut={logOut}
          userRollHandler={userRollHandler}
          userRoll={userRole}
          admin={admin}
          showDesktopFilters={showDesktopFilters}
          showMobileFilters={showMobileFilters}
          addScheduleHandler={addScheduleHandler}
          scrollY={scrollY}
          mobileFiltersHandler={mobileFiltersHandler}
          mobileMenuHandler={mobileMenuHandler}
        />
        {showMobileMenu && (
          <MobileMenu
            onClose={mobileMenuHandler}
            userInfo={userPicture}
            loginInfo={loginInfo}
            userRollHandler={userRollHandler}
            userRoll={userRole}
            login={login}
            logOut={logOut}
          />
        )}
        <div className="flex flex-1 flex-col lg:flex-row lg:justify-between mt-20 lg:mt-32 bg-white">
          <div
            ref={filtersRef}
            className="flex-1 px-2 lg:fixed top-20 w-full bg-white lg:w-60 pt-2 lg:pt-3 lg:px-0 lg:pr-2 overflow-y-scroll lg:top-32 lg:bottom-0 no-scrollbar"
          >
            {admin && showDesktopFilters && (
              <AddScheduleButton
                addScheduleHandler={addScheduleHandler}
                addSchedule={addSchedule}
              />
            )}
            <div
              className={`filters ${
                !showMobileFilters
                  ? showDesktopFilters
                    ? "w-full"
                    : "hidden"
                  : "w-full"
              } -mt-3 lg:mt-0 bg-white lg:relative mb-1 lg:mb-0`}
            >
              <ScheduleFilters
                onEmptyFilters={emptyFiltersHandler}
                onPassingFilters={dataFilterHandler}
              />
            </div>
          </div>

          <div className={`w-full px-2 lg:px-0 lg:pl-64`}>
            {scheduleLoading && <Spinner containerStyle="py-8" />}
            {hasServerError && (
              <div className="p-4 lg:mt-3 border border-borderGray shadow shadow-borderGray">
                <div className="flex justify-center py-4 text-4xl lg:text-6xl text-collegeRed">
                  <FontAwesomeIcon icon={faExclamation} />
                </div>
                <p className="pb-4">{content.errorMessages.serverError}</p>
                <button
                  onClick={scheduleReloadHandler}
                  className="py-1 px-8 my-4 border border-borderGray shadow hover:bg-borderGray hover:shadow-lg duration-150"
                >
                  Uuesti
                </button>
              </div>
            )}
            {admin && addSchedule && (
              <ScheduleAddition
                scheduled={data}
                onNewOccurence={newOccurenceHandler}
                onClose={closeAdditionModalHandler}
              />
            )}
            {[
              ...new Set(filteredData.map((e) => e.startTime.substring(0, 10))),
            ].map((e, i, s) => {
              let noSchoolWork =
                dateService.formatMilliseconds(s[i + 1]) -
                  dateService.formatMilliseconds(e) >
                86400000;
              let startDate;
              let endDate;
              if (noSchoolWork) {
                startDate = dateService.formatDayLongMonth(
                  addDays(new Date(e), 1)
                );
                endDate = dateService.formatDayLongMonth(
                  subDays(new Date(s[i + 1]), 1)
                );
              }

              return (
                <div key={i}>
                  <div
                    className={`flex items-center justify-between bg-collegeGreen w-full px-3 h-12 ${
                      i === 0 ? "mt-1 lg:mt-3" : "mt-9"
                    } text-base md:text-lg`}
                  >
                    <div className="flex">
                      <div className="font-bold pr-2 capitalize -ml-1 md:ml-0">
                        {dateService.formatWeekday(e)}
                      </div>
                      <div>{dateService.formatDayLongMonth(e)}</div>
                    </div>
                    <div>{dateService.formatYear(e)}</div>
                  </div>
                  <Table
                    userLecturer={userLecturer}
                    admin={admin}
                    isLoggedIn={admin || userLecturer || userStudent}
                    day={e}
                    filteredData={filteredData}
                    rawData={data}
                    onUpdate={newOccurenceHandler}
                  />
                  {noSchoolWork && (
                    <p className="my-8">{`Perioodil ${startDate} - ${endDate} õppetööd ei toimu!`}</p>
                  )}
                </div>
              );
            })}
            {(scheduleLoading ||
              response?.schedule.length === 0 ||
              filteredData.length === 0) && (
              <p className="mt-8">
                {scheduleLoading ? "Laeb" : !hasServerError ? notScheduled : ""}
              </p>
            )}
          </div>
        </div>
      </div>
      {showDesktopFilters && <GoTopButton />}
    </div>
  );
};

export default Home;
