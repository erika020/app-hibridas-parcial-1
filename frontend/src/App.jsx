import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/MainLayout";

// Rutas protegidas
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Vistas públicas
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";

// Secciones públicas
import Weapons from "./views/Weapons";
import Characters from "./views/Characters";
import Maps from "./views/Maps";
import Missions from "./views/Missions";
import Achievements from "./views/Achievement";
import Modes from "./views/Mode";
import WeaponsCompare from "./components/WeaponsCompare";

// CRUD públicos (editar desde admin igual)
import CreateWeapon from "./views/CreateWeapon";
import EditWeapon from "./views/EditWeapon";
import DeleteWeapon from "./views/DeleteWeapon";

import CreateCharacter from "./views/CreateCharacter";
import EditCharacter from "./views/EditCharacter";
import DeleteCharacter from "./views/DeleteCharacter";

import CreateMap from "./views/CreateMap";
import EditMap from "./views/EditMap";
import DeleteMap from "./views/DeleteMap";

import CreateMission from "./views/CreateMission";
import EditMission from "./views/EditMission";
import DeleteMission from "./views/DeleteMission";

import CreateAchievement from "./views/CreateAchievement";
import EditAchievement from "./views/EditAchievement";
import DeleteAchievement from "./views/DeleteAchievement";

import CreateMode from "./views/CreateMode";
import EditMode from "./views/EditMode";
import DeleteMode from "./views/DeleteMode";

// Admin
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUser";
import AdminEditUser from "./admin/AdminEditUser";

import AdminCharacters from "./admin/AdminCharacters";
import AdminMaps from "./admin/AdminMaps";
import AdminMissions from "./admin/AdminMissions";
import AdminModes from "./admin/AdminModes";
import AdminAchievements from "./admin/AdminAchievements";
import AdminWeapons from "./admin/AdminWeapons";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          {/* PÚBLICO */}
          <Route path="/" element={<Home />} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/achievement" element={<Achievements />} />
          <Route path="/mode" element={<Modes />} />
          <Route path="/compare" element={<WeaponsCompare />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTEGIDO */}
          <Route element={<PrivateRoute />}>
            <Route element={<AdminRoute />}>

              {/* PANEL ADMIN */}
              <Route path="/admin" element={<AdminLayout />}>

                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="users/edit/:id" element={<AdminEditUser />} />

                {/* GAME CONTENT ADMIN */}
                <Route path="weapons" element={<AdminWeapons />} />
                <Route path="characters" element={<AdminCharacters />} />
                <Route path="maps" element={<AdminMaps />} />
                <Route path="missions" element={<AdminMissions />} />
                <Route path="achievements" element={<AdminAchievements />} />
                <Route path="modes" element={<AdminModes />} />

              </Route>

              {/* CRUD (solo admin) */}
              <Route path="/weapons/create" element={<CreateWeapon />} />
              <Route path="/weapons/update/:id" element={<EditWeapon />} />
              <Route path="/weapons/delete/:id" element={<DeleteWeapon />} />

              <Route path="/characters/create" element={<CreateCharacter />} />
              <Route path="/characters/update/:id" element={<EditCharacter />} />
              <Route path="/characters/delete/:id" element={<DeleteCharacter />} />

              <Route path="/maps/create" element={<CreateMap />} />
              <Route path="/maps/update/:id" element={<EditMap />} />
              <Route path="/maps/delete/:id" element={<DeleteMap />} />

              <Route path="/missions/create" element={<CreateMission />} />
              <Route path="/missions/update/:id" element={<EditMission />} />
              <Route path="/missions/delete/:id" element={<DeleteMission />} />

              <Route path="/achievement/create" element={<CreateAchievement />} />
              <Route path="/achievement/update/:id" element={<EditAchievement />} />
              <Route path="/achievement/delete/:id" element={<DeleteAchievement />} />

              <Route path="/mode/create" element={<CreateMode />} />
              <Route path="/mode/update/:id" element={<EditMode />} />
              <Route path="/mode/delete/:id" element={<DeleteMode />} />

            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
