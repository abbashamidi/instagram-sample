export default function EditPassword({
    currentPassword,
    setCurrentPassword,
    currentPasswordError,
    newPassword,
    setNewPassword,
    newPasswordError,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
  }) {
    return (
      <div className="w-full space-y-2 border-t border-gray-700 pt-1.5 mt-1.5">
        <span className="block text-sm text-gray-400 mb-1 pl-1.5">
          Change Password
        </span>
  
        <input
          type="password"
          className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none border border-gray-700 focus:border-gray-500"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            // clear error here or in parent
          }}
        />
        {currentPasswordError && (
          <p className="text-red-500 text-sm mt-1">{currentPasswordError}</p>
        )}
  
        <input
          type="password"
          className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none border border-gray-700 focus:border-gray-500"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            // clear errors here or in parent
          }}
        />
  
        <input
          type="password"
          className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none border border-gray-700 focus:border-gray-500"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            // clear errors here or in parent
          }}
        />
        {confirmPasswordError && (
          <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
        )}
      </div>
    );
  }
  