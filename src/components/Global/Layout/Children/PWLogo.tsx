import Image from 'next/image';
import { useRouter } from 'next/router';

interface IPWLogoProps {}
const PWLogo: React.FC<IPWLogoProps> = ({}) => {
  const router = useRouter();
  return (
    <div
      className="bg-white cursor-pointer"
      onClick={() => {
        router.push('/students');
      }}
    >
      <Image src="/pw-logo.png" alt="pw-logo" width={50} height={50} />
    </div>
  );
};

export default PWLogo;
