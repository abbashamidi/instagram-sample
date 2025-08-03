import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../AuthContext/AuthContext";
import EditAvatar from "./EditAvatar";
import BottomSheetPanel from "./BottomSheetPanel";
import ConfirmModal from "./ConfirmModal";
import EditPassword from "./EditPassword";
import BioField from "./BioField";
import UsernameField from "./UsernameField";

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef(null); // 👈 برای کلیک بیرونی
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRemoveAvatar = () => {
    console.log("remove picture");
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("http://localhost:3000/avatar", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const avatarUrl = `http://localhost:3000${data.avatar}`;
      setAvatar(avatarUrl);

      dispatch({ type: "UPDATE_USER", payload: { avatar: data.avatar } });

      alert("Profile picture updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload avatar.");
    }
  };

  const handleSave = async () => {
    try {
      setNewPasswordError("");
      setConfirmPasswordError("");
      setCurrentPasswordError("");

      const res = await fetch("http://localhost:3000/me", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, bio }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      dispatch({ type: "UPDATE_USER", payload: { username, bio } });

      if (currentPassword || newPassword || confirmPassword) {
        if (!currentPassword) {
          setCurrentPasswordError("Current password is required");
          return;
        }

        if (!newPassword) {
          setNewPasswordError("New password is required");
          return;
        }

        if (newPassword !== confirmPassword) {
          setConfirmPasswordError("New passwords do not match");
          return;
        } else {
          setConfirmPasswordError("");
        }

        setNewPasswordError("");
        setConfirmPasswordError("");
        setCurrentPasswordError("");

        const pwRes = await fetch("http://localhost:3000/change-password", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!pwRes.ok) {
          const errorText = await pwRes.text();
          throw new Error(errorText || "Failed to change password");
        }
      }
    } catch (err) {
      console.error(err);
      setCurrentPasswordError(err.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const startTime = Date.now();

      try {
        const res = await fetch("http://localhost:3000/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUsername(data.username || "");
        setBio(data.bio || "");
        setAvatar(data.avatar ? `http://localhost:3000${data.avatar}` : null);
      } catch (err) {
        console.error(err);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = 1000 - elapsed;
        if (remaining > 0) setTimeout(() => setLoading(false), remaining);
        else setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showPanel &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setShowPanel(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showPanel]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#121212] text-white px-4 py-5 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/dashboard")}>
          <img
            src="https://www.svgrepo.com/show/326886/arrow-back-sharp.svg"
            alt="Back Arrow"
            className="w-6 h-6 invert"
          />
        </button>
        <h1 className="text-xl font-semibold">Edit Profile</h1>
      </div>

      <div className="flex flex-col items-center gap-1.5">

        <EditAvatar avatar={avatar} onEditClick={() => setShowPanel(true)} />

        <UsernameField username={username} setUsername={setUsername} />

        <EditPassword
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          currentPasswordError={currentPasswordError}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          newPasswordError={newPasswordError}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          confirmPasswordError={confirmPasswordError}
        />

        <BioField bio={bio} setBio={setBio} />

        <button
          onClick={() => setShowConfirmModal(true)} // ❌ Don't save yet
          className="mt-2 w-full py-2 rounded-md border border-gray-600 bg-[#2e2e2e] text-white font-medium hover:bg-[#3a3a3a] transition"
        >
          Save Changes
        </button>
      </div>

      {showPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-5 z-40 backdrop-blur-sm transition-opacity" />
      )}

      <BottomSheetPanel
        show={showPanel}
        panelRef={panelRef}
        onClose={() => setShowPanel(false)}
        onAvatarUpload={handleAvatarUpload}
        onRemoveAvatar={handleRemoveAvatar}
      />

      <ConfirmModal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={async () => {
          await handleSave();
          setShowConfirmModal(false);
          navigate("/");
        }}
      />
    </div>
  );
}
