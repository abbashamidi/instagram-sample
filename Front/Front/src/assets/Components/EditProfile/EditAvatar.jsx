export default function EditAvatar({ avatar, onEditClick }) {
  return (
    <div className="relative flex flex-col items-center">
      <img
        src={
          avatar ||
          "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
        }
        alt="Avatar"
        className="w-28 h-28 rounded-full object-cover border border-gray-500"
      />
      <span
        onClick={onEditClick}
        className="mt-4 text-sm text-blue-400 cursor-pointer hover:underline"
      >
        Edit Profile Picture
      </span>
    </div>
  );
}
