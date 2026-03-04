import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // Mặc định là true(tự fetch lại khi user quay lại tab)

      retry: 1,
      //mặc định là 3 lần(Retry failed requests)

      //Stale time: dữ liệu mới trong bao lâu
      staleTime: 1000 * 60 * 0,
      //mặc định là 0 (data ngay lập tức cũ)

      //Cache time: dữ liệu được giữ trong cache bao lâu khi không có component nào sử dụng đến nó
      gcTime: 5 * 60 * 1000,
      //mặc định là 5p
    },
  },
});
