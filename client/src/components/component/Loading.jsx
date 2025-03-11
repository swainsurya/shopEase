import { useUser } from '@/context/userContext';
import {RiseLoader} from "react-spinners"

const Loading = ({children}) => {
    const {loading} = useUser()
  return (
    loading ? (
        <div className='min-h-screen min-w-full flex items-center justify-center bg-slate-900'>
            <RiseLoader color='white' size={20}/>
        </div>
    ) : (
        <>
            {children}
        </>
    )
  )
}

export default Loading