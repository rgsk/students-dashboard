import useLocalStorage from 'hooks/useLocalStorage';

// here we demonstrate use of useLocalStorage
interface ISampleUseLocalStorageProps {}
const SampleUseLocalStorage: React.FC<ISampleUseLocalStorageProps> = ({}) => {
  const [name, setName] = useLocalStorage('name', 'Bob');
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};
export default SampleUseLocalStorage;
