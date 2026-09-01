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
      className={`bg-[#f5f0eb] text-[#3d2f2f] rounded-lg text-sm px-3 py-2 self-end ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const OtherMessageBubble = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`bg-[#d4c5b9] text-[#3d2f2f] rounded-lg text-sm px-3 py-2 self-start ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
};
