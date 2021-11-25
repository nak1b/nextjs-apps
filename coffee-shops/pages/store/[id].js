import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Store() {
  const router = useRouter()
  const { id } = router.query;

  return (
    <div>
      Store: {id}
      <Link href="/"><a>Back to home</a></Link>
    </div>
  );
}
 