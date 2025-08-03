export default function BottomSheetPanel({
  show,
  panelRef,
  onClose,
  onAvatarUpload,
  onRemoveAvatar,
}) {
  return (
    <div
      ref={panelRef}
      className={`fixed left-0 bottom-0 w-full bg-[#1e1e1e] text-white shadow-2xl rounded-t-xl p-4 transition-transform duration-300 z-50 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ height: "35vh" }}
    >
      <div className="flex items-center mb-4">
        <h2 className="flex-grow text-lg font-semibold text-center">
          Edit Picture
        </h2>
        <button
          onClick={onClose}
          className="text-2xl text-white transition"
          aria-label="Close panel"
        >
          &times;
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          id="avatar-input"
          className="hidden"
          onChange={onAvatarUpload}
        />

        <button
          onClick={() => document.getElementById("avatar-input").click()}
          className="py-2 px-4 rounded-md transition text-left border flex items-center gap-1"
        >
          <img
            src="./src/assets/Pictures/UpdatePic.svg"
            alt="Update Icon"
            className="w-6 h-6 invert"
          />
          Update Picture
        </button>
        <button
          onClick={onRemoveAvatar}
          className="py-2 px-4 rounded-md transition text-left text-red-500 border flex items-center gap-1"
        >
          <img
            src="./src/assets/Pictures/TrashBin.svg"
            alt="Trash Icon"
            className="w-5 h-5"
          />
          Remove Current Picture
        </button>
      </div>
    </div>
  );
}
