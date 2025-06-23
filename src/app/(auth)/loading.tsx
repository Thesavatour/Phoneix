import Logo from '@/icons/Logo';

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="spin-and-zoom-animation transition-transform duration-500">
        <Logo />
      </div>
    </div>
  );
}

export default Loading;
