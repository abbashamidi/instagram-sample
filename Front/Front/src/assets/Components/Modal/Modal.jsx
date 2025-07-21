export default function Modal({ message,subMessage }) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white px-6 py-8 rounded-xl shadow-xl text-center space-y-3">
          <p className="text-green-600 text-lg font-semibold">{message}</p>
          <p className="text-gray-500 text-sm italic">{subMessage}</p>
        </div>
      </div>
    );
  }
  