interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="header">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
    </div>
  )
}
