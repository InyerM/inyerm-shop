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

interface adminMenuItem {
  label: string
  url: string
  icon: keyof typeof icons
}

interface clientMenuItem {
  label: string
  icon: keyof typeof icons
  properties?: Object
}

export const icons = {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
}

export const adminMenu: adminMenuItem[] = [
  {
    label: "Products",
    icon: "CategoryOutlined",
    url: ''
  },
  {
    label: "Orders",
    icon: "ConfirmationNumberOutlined",
    url: ''
  },
  {
    label: "Users",
    icon: "AdminPanelSettings",
    url: ''
  },
]

export const clientMenu: clientMenuItem[] = [
  {
    label: "Profile",
    icon: "AccountCircleOutlined",
  },
  {
    label: "My orders",
    icon: "ConfirmationNumberOutlined",
  },
  {
    label: "Men",
    icon: "MaleOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
  },
  {
    label: "Women",
    icon: "FemaleOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
  },
  {
    label: "Kids",
    icon: "EscalatorWarningOutlined",
    properties: {
      sx: { display: { xs: "", sm: "none" } },
    },
  },
  {
    label: "Login",
    icon: "VpnKeyOutlined",
  },
  {
    label: "Logout",
    icon: "LoginOutlined",
  },
];