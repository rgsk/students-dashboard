import authApi from 'api/authApi';
import FilledButton from 'components/Shared/Button';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useState } from 'react';

interface ILoginPageProps {}
const LoginPage: React.FC<ILoginPageProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const inputClassName = 'my-input w-[300px]';

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const response = authApi.login({
        email,
        password,
      });
      if (response.error) {
        setError(response.message);
      } else {
        router.push('/');
      }
    },
    [email, password, router]
  );
  return (
    <div className="h-screen flex justify-center">
      <form className="mt-[30vh]" onSubmit={handleSubmit}>
        <h3 className="text-xl mb-5">Please login to continue</h3>
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <div className="mt-5 flex-center">
          <FilledButton type="submit">Login</FilledButton>
        </div>
      </form>
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
