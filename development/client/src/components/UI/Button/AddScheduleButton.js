import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddScheduleButton = (props) => {
  return (
    <div
      onClick={props.addScheduleHandler}
      className="realtive flex justify-between items-center group relative mx-auto mt-2 lg:-mt-1 mb-3 w-1/3 h-11 font-bold bg-darkGray text-white shadow lg:w-full"
    >
      <div className="green-peeper" />
      <button type="button" className="w-full">
        LISA
      </button>
      <div className="absolute right-0">
        {!props.addSchedule && (
          <FontAwesomeIcon
            icon={faAngleRight}
            className="text-base text-white pt-7 rotate-90 lg:rotate-0 lg:pr-4 lg:pt-0"
          />
        )}
        {props.addSchedule && (
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-base text-white pt-7 rotate-90 lg:rotate-0 lg:pr-4 lg:pt-0"
          />
        )}
      </div>
    </div>
  );
};
