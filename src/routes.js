import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/add-cs",
    name: "Add New CS",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/delete-cs",
    name: "Delete CS",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/add-admin",
    name: "Add New Admin",
    icon: "ni ni-circle-08 text-pink",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/delete-admin",
    name: "Delete Admin",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/create-company",
    name: "Create New Company",
    icon: "ni ni-fat-add text-orange",
    component: Tables,
    layout: "/customer",
  },
  {
    path: "/edit-company",
    name: "Edit Company",
    icon: "ni ni-ruler-pencil text-red",
    component: Register,
    layout: "/customer",
  },
  {
    path: "/list-company",
    name: "Company List",
    icon: "ni ni-bullet-list-67 text-info",
    component: Register,
    layout: "/customer",
  },
  {
    path: "/password-change",
    name: "Change Password",
    icon: "ni ni-key-25 text-pink",
    component: Register,
    layout: "/customer",
  },
];
export default routes;
