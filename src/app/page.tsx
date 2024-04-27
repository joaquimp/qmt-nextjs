import TriadicMentalQuotient from '@/components/TriadicMentalQuotient';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <main className='p-12'>
      <TriadicMentalQuotient />
    </main>
  );
}
