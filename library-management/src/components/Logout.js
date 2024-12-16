import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  return (
    <button
      className="btn btn-primary  rounded-pill p-2 d-flex justify-content-center align-items-center"
      style={{
        position: "absolute",
        top: 10,
        right: 10,
      }}
      onClick={logout}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
      </svg>
    </button>
  );
};
export default Logout;