import { useEffect, useState } from "react";

/**
 * Custom Hook: useDebounce
 * Debounce pattern: Trì hoãn xử lý cho đến khi user NGỪNG typing.
 *
 * Use case: Ô search
 * - User gõ: "r" → "re" → "rea" → "reac" → "react"
 * - Không debounce: Gọi API 5 lần (mỗi ký tự 1 lần) ❌
 * - Có debounce: Chỉ gọi API 1 lần sau khi user ngừng gõ 500ms ✅
 *
 * Generic type <T>: Hook này hoạt động với BẤT KỲ type nào.
 * VD: useDebounce<string>("abc") → T = string
 *     useDebounce<number>(123) → T = number
 *
 * Default parameter: delay = 500
 * → Nếu không truyền param thứ 2, mặc định = 500ms.
 * VD: useDebounce(searchText) = useDebounce(searchText, 500)
 */
export function useDebounce<T>(value: T, delay = 500): T {
  /**
   * useState với GENERIC type.
   * useState(value): Initial state = giá trị được truyền vào.
   * VD: value = "react" → debounced ban đầu = "react"
   */
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    /**
     * setTimeout: Hẹn giờ chạy function sau `delay` ms.
     * Trả về timer ID (number) để có thể huỷ sau này.
     *
     * Arrow function: () => setDebounced(value)
     * → Sau `delay` ms, cập nhật debounced = value mới.
     */
    const timer = setTimeout(() => setDebounced(value), delay);

    /**
     * CLEANUP FUNCTION: Function được return trong useEffect.
     * React gọi cleanup function khi:
     * 1. Component unmount (bị xoá khỏi DOM)
     * 2. Trước khi chạy effect LẦN TIẾP (khi dependencies thay đổi)
     *
     * clearTimeout(timer): HUỶ timer đang chờ.
     *
     * Cơ chế hoạt động:
     * - User gõ "r" → Set timer 500ms
     * - User gõ "e" (sau 100ms) → HUỶ timer cũ, set timer mới 500ms
     * - User gõ "a" (sau 100ms) → HUỶ timer cũ, set timer mới 500ms
     * - User NGỪNG gõ → Sau 500ms, timer chạy, update debounced
     *
     * Nếu không có cleanup → TẤT CẢ timers đều chạy → Gọi API nhiều lần!
     */
    return () => clearTimeout(timer);
  }, [value, delay]); // Dependencies: Effect chạy lại khi value hoặc delay thay đổi

  /**
   * Return giá trị debounced (giá trị "chậm" hơn value).
   * Component dùng hook này sẽ nhận được giá trị CŨ cho đến khi
   * user ngừng thay đổi trong `delay` ms.
   */
  return debounced;
}
