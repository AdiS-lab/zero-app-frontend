export const Background = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`min-h-screen bg-[#0F3040] border-none ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  )
}
