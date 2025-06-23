import { Metadata } from 'next';

import SignIn from '@/features/Auth/SIgnIn/SignIn';

export const metadata: Metadata = {
  title: 'Sign In',
};

function Page() {
  return (
    <>
      <SignIn />
    </>
  );
}

export default Page;
