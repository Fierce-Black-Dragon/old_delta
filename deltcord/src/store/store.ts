import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { User } from '../types'

interface DeltaStore {

    user: User;
    setUser: (nUser: User) => void;

}

const useDeltaStore = create<DeltaStore>()(
    devtools(
        persist(
            (set) => ({
                user: {
                    email: "",
                    full_name: "",
                    id: 0,
                    image_url: "",
                    info: "",
                    username: "",
                    isloggedin: false
                },
                setUser: (nUser) => set(() => ({ user: nUser })),

            }),
            {
                name: 'detla-storage',
            }
        )
    )
)
export default useDeltaStore
