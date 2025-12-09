interface SidebarProps {
  activeMenu: string
  onMenuChange: (menu: string) => void
}

export default function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
  void activeMenu
  void onMenuChange
  return null
}
