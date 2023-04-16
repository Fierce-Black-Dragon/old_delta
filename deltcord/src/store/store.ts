import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from '../types'

interface DeltaStore {

    user: User;
    setUser: (user: User) => void;
    

}

const useDeltaStore = create<DeltaStore>()(
    devtools(
        persist(
            (set) => ({
                user: {
                    email: "",
                    username:"",
                    accessToken:"",
                },
                setUser: (nUser) => set(() =>{
                    console.log(nUser)
                    return ({ user: nUser })
                }),

            }),
            {
                name: 'detla-storage',
            }
        )
    )
)
export default useDeltaStore
