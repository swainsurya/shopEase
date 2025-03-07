import { useUser } from '@/context/userContext';
import { LoaderCircleIcon } from 'lucide-react';

const Loading = ({children}) => {
    const {loading} = useUser()
  return (
    loading ? (
        <div className='min-h-screen min-w-full flex items-center justify-center'>
            <LoaderCircleIcon className='animate-spin text-emerald-600' size={50} />
        </div>
    ) : (
        <>
            {children}
        </>
    )
  )
}

export default Loading