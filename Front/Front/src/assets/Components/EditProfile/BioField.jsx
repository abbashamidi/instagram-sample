export default function BioField({ bio, setBio }) {
    return (
      <div className="w-full border-t border-gray-700 pt-1.5 mt-1.5">
        <span className="block text-sm text-gray-400 mb-1 pl-1.5">Bio</span>
        <textarea
          className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-white outline-none border border-gray-700 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 transition resize-none"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
    );
  }
  