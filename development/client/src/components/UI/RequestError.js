import content from "../../assets/content/content.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export const RequestError = (props) => {
  const { errorMessage, requestHandler, size, buttonText } = props;

  return (
    <div
      className={`p-4 lg:mt-3 border border-borderGray shadow shadow-borderGray ${
        size ? size : "w-full"
      }`}
    >
      <div className="flex justify-center py-4 text-4xl lg:text-6xl text-collegeRed">
        <FontAwesomeIcon icon={faExclamation} />
      </div>
      <p className="pb-4">
        {errorMessage ? errorMessage : content.errorMessages.serverError}
      </p>
      <button
        onClick={requestHandler}
        className="py-1 px-8 my-4 border border-borderGray shadow hover:bg-borderGray hover:shadow-lg duration-150"
      >
        {buttonText ? buttonText : "Uuesti"}
      </button>
    </div>
  );
};
