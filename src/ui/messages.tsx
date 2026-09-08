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
  imgId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { imgId?: string }) => {
  return (
    <div
      className={`bg-[#f5f0eb] text-[#3d2f2f] rounded-lg text-sm px-3 py-2 self-end flex items-center gap-2 ${className ?? ""}`}
      {...props}
    >
      <span>{children}</span>
      {imgId && (
        <img
          src={imgId}
          alt=""
          className="w-6 h-6 rounded-full object-cover shrink-0"
        />
      )}
    </div>
  );
};

export const OtherMessageBubble = ({
  children,
  className,
  imgId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { imgId?: string }) => {
  return (
    <div
      className={`bg-[#d4c5b9] text-[#3d2f2f] rounded-lg text-sm px-3 py-2 self-start flex items-center gap-2 ${className ?? ""}`}
      {...props}
    >
      {imgId && (
        <img
          src={imgId}
          alt=""
          className="w-6 h-6 rounded-full object-cover shrink-0"
        />
      )}
      <span>{children}</span>
    </div>
  );
};
