export const Messages = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`flex flex-col gap-2 w-full max-h-64 overflow-y-auto ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const MessageBubble = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`bg-[#464858] text-[#D99B7F] rounded-lg text-sm px-3 py-2 ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};
