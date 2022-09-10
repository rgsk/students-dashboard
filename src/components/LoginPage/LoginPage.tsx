import FilledButton from 'components/Shared/Button';
import { useState } from 'react';

interface ILoginPageProps {}
const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputClassName = 'my-input w-[300px]';
  return (
    <div className="h-screen flex justify-center">
      <div className="mt-[30vh]">
        <div className="space-y-3">
          <FieldContainer>
            <label className="my-label" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              className={inputClassName}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <label className="my-label" htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              className={inputClassName}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FieldContainer>
        </div>
        <div className="mt-5 flex-center">
          <FilledButton>Login</FilledButton>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
interface IFieldContainerProps {
  children: React.ReactNode;
}
const FieldContainer: React.FC<IFieldContainerProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-end space-x-5 w-[400px]">
      {children}
    </div>
  );
};
