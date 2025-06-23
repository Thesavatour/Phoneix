import Image from 'next/image';

import Button from '@/components/Button';
import DeleteIcon from '@/icons/DeleteIcon';

function ProfileInfo() {
  return (
    <div>
      <p className="text-base leading-6 text-white mb-[10px]">
        Profile Picture
      </p>
      <div className="flex gap-3 items-center">
        <Image
          height={90}
          width={90}
          src="https://images.unsplash.com/photo-1721390336122-c883e2b5c113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="rounded-full h-[90px] w-[90px]"
        />
        <Button type="light">Change Profile</Button>
        <div className="cursor-pointer">
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
