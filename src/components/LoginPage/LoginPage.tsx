import authApi, { credentials } from 'api/authApi';
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
        alert(`
          Please use following credentials - 
          Email: ${credentials.email}
          Password: ${credentials.password}
        `);
      } else {
        router.push('/');
      }
    },
    [email, password, router]
  );
  return (
    <div className="h-screen flex justify-center">
      <form className="mt-[15vh]" onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="text-2xl text-center">Login</h3>
          <p className="text-lg text-center">to continue to dashboard</p>
        </div>
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
        <div className="mt-5 flex-center space-x-3">
          <FilledButton type="submit">Login</FilledButton>
          <FilledButton
            type="button"
            onClick={() => {
              setEmail(credentials.email);
              setPassword(credentials.password);
            }}
          >
            Auto Fill Credentials (For Testing)
          </FilledButton>
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
