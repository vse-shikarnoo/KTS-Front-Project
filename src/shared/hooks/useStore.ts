import { useContext } from 'react'
import { StoreContext } from '@app/providers/store-provider/StoreProvider'

// Счетчик для отслеживания вызовов хука
let useStoreCallCount = 0;

export const useStore = () => {
  useStoreCallCount++;
  const callId = useStoreCallCount;
  
  console.log(`[DEBUG] useStore called (#${callId})`)
  
  const store = useContext(StoreContext)
  if (!store) {
    console.error(`[DEBUG] useStore (#${callId}): store not found in context`)
    throw new Error('useStore must be used within StoreProvider')
  }
  
  console.log(`[DEBUG] useStore (#${callId}): store retrieved successfully`)
  return store
} 