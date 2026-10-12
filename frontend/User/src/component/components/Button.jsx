export const Button = ({
  className = "",
  size = "default",
  children,
  ...props
}) => {
  const baseClass =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground  hover:bg-primary/90 shadow-lg shadow-primary/25 cursor-pointer";
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const classes = `${baseClass} ${sizeClasses[size]} ${className} `;
  return (
    <button className={classes} {...props}>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};
export const Button2 = ({ className = "", size = "default", children }) => {
  const baseClass =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-secondary text-primary-foreground  hover:bg-muted/90 shadow-lg shadow-primary/25 flex items-center justify-center bg-gray-100 border border-blue-500 rounded-full transition-all duration-300 ease-linear shadow-lg shadow-blue-500/50 hover:border-primary  focus:ring-blue-500  relative";
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClass} ${sizeClasses[size]} ${className} `;
  return (
    <a href="/resume/myResume.pdf">
      <button className={`${classes} cursor-pointer`}>
        <span className="relative flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    </a>
  );
};
