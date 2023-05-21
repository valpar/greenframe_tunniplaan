import UserEditModal from "./UserEditModal";

export const UsersTabelContent = (props) => {
  const {
    users,
    roleOptions,
    editModalHandler,
    showEditModal,
    editRowIndex,
    reloadHandler,
  } = props;

  return users.map((e, i) => {
    return (
      <div
        key={i}
        className="flex flex-col lg:flex-row justify-center items-center w-full"
      >
        <div className="group user-tab-row">
          <div className="flex flex-row  w-full">
            <div className="user-tab-h-m">EESNIMI</div>
            <div className="user-tab-td">{e.firstName}</div>
          </div>
          <div className="flex flex-row w-full">
            <div className="user-tab-h-m">PERENIMI</div>
            <div className="user-tab-td">{e.lastName}</div>
          </div>
          <div className="flex flex-row w-full">
            <div className="user-tab-h-m">EMAIL</div>
            <div className="user-tab-td">{e.email}</div>
          </div>
          <div className="flex flex-row w-full">
            <div className="user-tab-h-m">ROLL</div>
            <div className="user-tab-td">
              {
                roleOptions.find((item) => {
                  return item.value === e.role;
                })?.label
              }
            </div>
          </div>
          <div className="px-4 group-hover:px-2 text-base">
            <i
              className="hidden group-hover:lg:block bi bi-pencil-fill cursor-pointer"
              onClick={editModalHandler}
              index={i}
            ></i>
          </div>
          <div className="flex flex-row justify-center w-full lg:hidden mt-4">
            <button
              onClick={editModalHandler}
              index={i}
              className="btn-actions"
              type="submit"
            >
              MUUDA
            </button>
          </div>
        </div>
        {showEditModal && editRowIndex === i && (
          <UserEditModal
            editMode={true}
            editValues={e}
            onChange={reloadHandler}
            onClose={editModalHandler}
            users={users}
          />
        )}
      </div>
    );
  });
};
