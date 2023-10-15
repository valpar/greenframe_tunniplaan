import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddScheduleButton = (props) => {
  return (
    <div
      onClick={props.addScheduleHandler}
      className="realtive flex justify-between items-center group relative mx-auto mt-2 lg:mt-0 mb-3 w-1/3 h-11 font-bold bg-darkGray text-white shadow lg:w-full"
    >
      <div className="green-peeper" />
      <button type="button" className="w-full">
        LISA
      </button>
      <FontAwesomeIcon
        icon={faAngleRight}
        data-testid="font-awesome-icon"
        className={`${
          props.addSchedule ? "rotate-180" : ""
        } right-0 absolute text-base text-white p-4 duration-150`}
      />
    </div>
  );
};
