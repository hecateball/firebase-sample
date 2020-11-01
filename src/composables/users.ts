import { inject, InjectionKey, Ref } from 'vue'
import type { User } from 'firebase/app'

export const CurrentUser: InjectionKey<{
  currentUser: Ref<User | null>
}> = Symbol()

export const useCurrentUser = () => {
  const currentUser = inject(CurrentUser)
  if (currentUser === undefined) {
    throw new Error('currentUser is not provided')
  }
  return { ...currentUser }
}
