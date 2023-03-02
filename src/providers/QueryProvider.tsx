import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import React from 'react'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 5,
            staleTime: 1000 * 30,
            refetchOnMount: false,
            refetchOnReconnect: true,
            refetchOnWindowFocus: false,
        },
    },
})

interface Props {
    children?: React.ReactNode
}
const QueryProvider: React.FC<Props> = ({children}) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
