interface IIconButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}
const IconButton: React.FC<IIconButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-between gap-1 rounded border
         border-gray-200 p-2 text-xs font-medium leading-tight 
         transition duration-150 ease-in-out
          hover:bg-indigo-500 hover:text-white
          disabled:bg-gray-200 hover:disabled:text-black
        `}
    >
      {children}
    </button>
  );
};
export default IconButton;
