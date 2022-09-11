import classNames from 'classnames';

interface IFilledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'normal' | 'danger' | 'warning';
}
const FilledButton: React.FC<IFilledButtonProps> = ({
  children,
  variant = 'normal',
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        {
          [`
   flex items-center justify-between gap-1
    rounded border border-gray-200 bg-indigo-500 p-2 text-xs
    font-medium leading-tight text-white transition duration-150 ease-in-out
     hover:bg-indigo-600 disabled:brightness-50 disabled:cursor-not-allowed
   `]: true,
          [`bg-red-500 hover:bg-red-600`]: variant === 'danger',
          [`bg-yellow-600 hover:bg-yellow-700`]: variant === 'warning',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default FilledButton;
