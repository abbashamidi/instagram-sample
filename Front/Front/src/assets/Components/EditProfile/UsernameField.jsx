export default function UsernameField({ username, setUsername }) {
    return (
      <div className="w-full">
        <span className="block text-sm text-gray-400 mb-1 pl-1.5">
          Username
        </span>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 transition"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    );
  }
  