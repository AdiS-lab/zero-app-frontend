export const Label = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className={`text-[#3d2f2f]/70 text-xs font-medium ${className ?? ''}`} {...props}>
      {children}
    </label>
  );
};
