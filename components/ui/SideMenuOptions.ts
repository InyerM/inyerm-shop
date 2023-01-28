import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined"
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings"
import CategoryOutlined from "@mui/icons-material/CategoryOutlined"
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined"
import EscalatorWarningOutlined from "@mui/icons-material/EscalatorWarningOutlined"
import FemaleOutlined from "@mui/icons-material/FemaleOutlined"
import LoginOutlined from "@mui/icons-material/LoginOutlined"
import MaleOutlined from "@mui/icons-material/MaleOutlined"
import SearchOutlined from "@mui/icons-material/SearchOutlined"
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined"
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined"
import DashboardOutlined from "@mui/icons-material/DashboardOutlined"

interface adminMenuItem {
  label: string
  url: string
  icon: keyof typeof icons
}

interface clientMenuItem {
  label: string
  icon: keyof typeof icons
  properties?: Object
  href?: string
  auth: boolean
  notLogged: boolean
}

export const icons = {
  AccountCircleOutlined,
  AdminPanelSettings,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
  HowToRegOutlinedIcon,
  DashboardOutlined,
  CategoryOutlined,
}

export const adminMenu: adminMenuItem[] = [
  {
    label: "Dashboard",
    icon: "DashboardOutlined",
    url: "/admin/",
  },
  {
    label: "Orders",
    icon: "ConfirmationNumberOutlined",
    url: "/admin/orders/",
  },
  {
    label: "Users",
    icon: "AdminPanelSettings",
    url: "/admin/users/",
  },
  {
    label: "Products",
    icon: "CategoryOutlined",
    url: "/admin/products/",
  },
]

export const clientMenu: clientMenuItem[] = [
  {
    label: "My orders",
    icon: "ConfirmationNumberOutlined",
    href: "/orders/history",
    auth: true,
    notLogged: false,
  },
  {
    label: "Men",
    icon: "MaleOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
    href: "/category/men",
    auth: false,
    notLogged: false,
  },
  {
    label: "Women",
    icon: "FemaleOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
    href: "/category/women",
    auth: false,
    notLogged: false,
  },
  {
    label: "Kids",
    icon: "EscalatorWarningOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
    href: "/category/kid",
    auth: false,
    notLogged: false,
  },
  {
    label: "Login",
    icon: "VpnKeyOutlined",
    auth: false,
    href: "/auth/login",
    notLogged: true,
  },
  {
    label: "Logout",
    icon: "LoginOutlined",
    auth: true,
    notLogged: false,
  },
  {
    label: "Register",
    icon: "HowToRegOutlinedIcon",
    auth: false,
    href: "/auth/register",
    notLogged: true,
  },
]
