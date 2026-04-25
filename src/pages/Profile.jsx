import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    updateUserProfile(name, photoURL)
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-primary/10 h-32"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 flex justify-center">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photoURL || "https://i.ibb.co/XpnkK7R/user-profile-icon.png"} alt="User Profile" />
              </div>
            </div>
          </div>
          <div className="text-center mt-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{user?.displayName || "User"}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          <div className="divider">Update Profile</div>

          <form onSubmit={handleUpdate} className="space-y-4 mt-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                placeholder="Enter your name"
                className="input input-bordered w-full focus:outline-primary"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Photo URL</span>
              </label>
              <input
                type="url"
                name="photoURL"
                defaultValue={user?.photoURL}
                placeholder="Enter photo URL"
                className="input input-bordered w-full focus:outline-primary"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
