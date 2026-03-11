# My App - Quản Lý Nghi Thức

Một ứng dụng web hiện đại được xây dựng bằng React, TypeScript và Vite, cung cấp các chức năng quản lý nghi thức, xác thực người dùng, và quản lý hồ sơ người dùng.

## ✨ Tính Năng Chính

- **Xác Thực Người Dùng**: Đăng ký, đăng nhập, đăng xuất với bảo mật
- **Quản Lý Hồ Sơ**: Xem và cập nhật thông tin người dùng
- **Quản Lý Nghi Thức**: CRUD (Tạo, Đọc, Cập nhật, Xóa) cho nghi thức
- **Bảng Hiển Thị Dữ Liệu**: Danh sách nghi thức với phân trang
- **Chế Độ Sáng/Tối**: Hỗ trợ chuyển đổi theme
- **Giao Diện Đáp Ứng**: Thiết kế responsive cho tất cả thiết bị
- **Quản Lý Trạng Thái**: Sử dụng Zustand cho state management
- **Cache Dữ Liệu**: React Query cho quản lý dữ liệu từ server

## 🛠️ Công Nghệ Sử Dụng

- **React 19**: Thư viện JavaScript cho UI
- **TypeScript**: Kiểm tra kiểu tĩnh cho JavaScript
- **Vite**: Build tool nhanh chóng cho phát triển hiện đại
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Định tuyến ứng dụng
- **React Hook Form**: Quản lý biểu mẫu
- **Zod**: Xác thực schema
- **Axios**: HTTP client
- **React Query**: Server state management
- **Zustand**: Client state management
- **Radix UI**: Component library không có style
- **Sonner**: Toast notifications

## 📁 Cấu Trúc Dự Án

```
src/
├── app/                      # Cấu hình ứng dụng chính
│   ├── App.tsx              # Component gốc
│   ├── router.tsx           # Cấu hình routing
│   ├── store.ts             # Global store (Zustand)
│   └── providers/           # Context providers
├── features/                # Các tính năng chính
│   ├── auth/                # Xác thực
│   ├── dashboard/           # Bảng điều khiển
│   ├── landing/             # Trang chủ
│   ├── rituals/             # Quản lý nghi thức
│   └── users/               # Quản lý người dùng
├── shared/                  # Code dùng chung
│   ├── components/          # Các component tái sử dụng
│   ├── hooks/               # Custom hooks
│   ├── services/            # API services
│   ├── types/               # TypeScript types
│   └── constants/           # Hằng số
├── lib/                     # Thư viện cấu hình
│   ├── axios.ts             # Cấu hình Axios
│   ├── env.ts               # Biến môi trường
│   └── queryClient.ts       # Cấu hình React Query
└── styles/                  # CSS global
```

## 🚀 Cài Đặt & Chạy

### Yêu Cầu

- Node.js 18+
- npm hoặc yarn

### Bước 1: Cloning và Cài Đặt Dependencies

```bash
cd my-app
npm install
```

### Bước 2: Cấu Hình Biến Môi Trường

Tạo file `.env` hoặc `.env.local` (nếu chưa có):

```env
VITE_API_URL=http://localhost:3000
```

### Bước 3: Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Bước 4: Build cho Production

```bash
npm run build
```

Kiểm tra bản build:

```bash
npm run preview
```

## 📋 Các Script Sẵn Có

- **`npm run dev`** - Chạy development server với hot reload
- **`npm run build`** - Build ứng dụng cho production
- **`npm run lint`** - Kiểm tra code linting với ESLint
- **`npm run preview`** - Xem preview bản build production localhost

## 🏗️ Kiến Trúc Ứng Dụng

### Tính Năng (Features)

Mỗi tính năng được tổ chức theo cấu trúc:

```
feature/
├── components/    # UI components
├── hooks/         # Custom hooks
├── pages/         # Page components
├── services.ts    # API calls
├── types.ts       # TypeScript types
├── schema.ts      # Zod validation schemas
└── store.ts       # Feature-specific state
```

### Shared Components

- **Common Components**: `GuestRoute`, `ProtectedRoute`, `LoadingSpinner`, `ErrorState`, v.v.
- **UI Components**: Button, Input, Dialog, Table, Card, v.v. (từ Radix UI + TailwindCSS)

### State Management

- **Global State**: Zustand (`src/app/store.ts`)
- **Server State**: React Query cho caching và fetching

### API Integration

- Base service class tại `src/shared/services/BaseService.ts`
- Axios instance được cấu hình tại `src/lib/axios.ts`

## 🔐 Xác Thực

Ứng dụng sử dụng JWT tokens cho xác thực:

- Token được lưu trong localStorage
- Tự động thêm token vào headers của request
- Hỗ trợ refresh token

## 🎨 Themes

Ứng dụng hỗ trợ chế độ sáng/tối:

- Sử dụng `next-themes` để quản lý theme
- Theme được lưu trong localStorage
- Component `ThemeToggle` để chuyển đổi

## 📦 Phân Trang

- Danh sách nghi thức sử dụng component `Pagination`
- Hỗ trợ điều hướng trang và thay đổi số lượng items

## 🚨 Xử Lý Lỗi

- Error boundaries cho bắt lỗi component
- `ErrorState` component hiển thị lỗi thân thiện
- Toast notifications với Sonner

## 🔗 API Routes

Ứng dụng kết nối với backend API:

### Auth

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất

### Rituals

- `GET /api/rituals` - Danh sách nghi thức
- `GET /api/rituals/:id` - Chi tiết nghi thức
- `POST /api/rituals` - Tạo nghi thức
- `PUT /api/rituals/:id` - Cập nhật nghi thức
- `DELETE /api/rituals/:id` - Xóa nghi thức

### Users

- `GET /api/users/profile` - Lấy thông tin hồ sơ
- `PUT /api/users/profile` - Cập nhật hồ sơ
- `GET /api/users` - Danh sách người dùng (Admin)

## 💡 Hướng Dẫn Phát Triển

### Tạo một Route Mới

1. Thêm page component vào feature tương ứng
2. Cấu hình route trong `src/app/router.tsx`
3. Thêm layout nếu cần

### Thêm một Tính Năng Mới

1. Tạo folder feature mới với cấu trúc chuẩn
2. Viết components, hooks, services
3. Kết nối vào routing

### Thêm API Call Mới

1. Tạo service class kế thừa `BaseService`
2. Khai báo types trong `types.ts`
3. Sử dụng `useQuery` hoặc `useMutation` từ React Query

## 🐛 Troubleshooting

### Build Lỗi TypeScript

```bash
npm run build
# Kiểm tra lỗi trong src/
```

### Module Not Found

- Kiểm tra import paths
- Đảm bảo file tồn tại
- Kiểm tra tsconfig `baseUrl` nếu sử dụng alias

### CORS Issues

- Kiểm tra `.env` file VITE_API_URL
- Xác thực CORS được bật trên backend

## 📝 Commit & Version Control

Dự án sử dụng Git. Các bước thông thường:

```bash
git add .
git commit -m "feat: description"
git push
```

## 📄 License

MIT

## 👨‍💻 Tác Giả

Tạo bởi đội phát triển.

---

**Happy Coding! 🎉**
