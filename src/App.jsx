import { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";

import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";

import CommentForm from "./components/CommentForm/CommentForm";
import HootDetails from "./components/HootDetails/HootDetails";
import HootForm from "./components/HootForm/HootForm";
import HootList from "./components/HootList/HootList";
import { UserContext } from "./contexts/UserContext";
import * as hootService from "./services/hootService";

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();

      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  const handleAddHoot = (newHoot) => {
    setHoots([newHoot, ...hoots]);
    navigate("/hoots");
  };

  const handleDeleteHoot = async (hootId) => {
    const deletedHoot = await hootService.deleteHoot(hootId);
    setHoots(hoots.filter((hoot) => hoot._id !== deletedHoot.hootId));
    navigate("/hoots");
  };

  const handleUpdateHoot = async (hootId, hootFormData) => {
    const updatedHoot = await hootService.update(hootId, hootFormData);
    setHoots(hoots.map((hoot) => (hootId === hoot._id ? updatedHoot : hoot)));
    navigate(`/hoots/${hootId}`);
  };

  return (
    <>
      <pre>{JSON.stringify(user)}</pre>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        {user ? (
          <>
            {/* Protected routes (available only to signed-in users) */}
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            <Route
              path="/hoots/new"
              element={<HootForm handleAddHoot={handleAddHoot} />}
            />
            <Route
              path="/hoots/:hootId"
              element={<HootDetails handleDeleteHoot={handleDeleteHoot} />}
            >
              <Route path="comments/new" element={<CommentForm />} />
              {/* <Route path="edit" element={<HootForm />} /> */}
            </Route>
            <Route
              path="/hoots/:hootId/edit"
              element={<HootForm handleUpdateHoot={handleUpdateHoot} />}
            />
          </>
        ) : (
          <>
            {/* Non-user routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
        <Route path="/*" element={<p>No such page</p>} />
      </Routes>
    </>
  );
};

export default App;