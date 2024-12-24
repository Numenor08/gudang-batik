# Final Project Pemrograman Framework 2024

Ini adalah proyek akhir untuk kelas "Pemrograman Framework" tahun 2024.

## Teknologi yang Digunakan

### Backend
- **Express.js**: Sebagai framework untuk membangun server-side aplikasi.
- **MySQL**: Sebagai database untuk menyimpan data.

### Frontend
- **React.js**: Sebagai library untuk membangun user interface.

## Setup Database dan Environment

1. **Nyalakan Database MySQL**  
   Pastikan MySQL Anda sudah berjalan di komputer lokal atau server yang sesuai.

2. **Import Empty Database**  
   - Buka direktori: `pergudangan-backend/db`.
   - Import file tersebut ke dalam MySQL Anda menggunakan tools seperti **phpMyAdmin**, **MySQL Workbench**, atau **Command Line**:
     ```bash
     mysql -u [username] -p [database_name] < empty-database.sql
     ```

3. **Konfigurasi File Environment**  
   - **Backend**  
     1. Masuk ke folder: `pergudangan-backend`.  
     2. Salin file `.env.example` menjadi `.env`:
        ```bash
        cp .env.example .env
        ```
     3. Isi file `.env` dengan konfigurasi berikut:
        ```env
        # .env Backend
        JWT_SECRET=           # Secret untuk Access Token JWT
        JWT_REFRESH_SECRET=   # Secret untuk Refresh Token JWT
        DB_HOST=              # Host database, contoh: localhost
        DB_USER=              # Username database MySQL Anda
        DB_PASSWORD=          # Password database MySQL Anda
        DB_NAME=              # Nama database MySQL Anda
        PORT=                 # Port untuk backend, contoh: 5000
        ```

   - **Frontend**  
     1. Masuk ke folder: `pergudangan-frontend`.  
     2. Salin file `.env.example` menjadi `.env`:
        ```bash
        cp .env.example .env
        ```
     3. Isi file `.env` dengan konfigurasi berikut:
        ```env
        # .env Frontend
        VITE_API_URL=         # URL Server backend Anda, contoh: http://localhost:5000
        ```

4. **Finalisasi**  
   Pastikan semua file `.env` telah diisi dengan benar dan database telah berhasil diimport. Anda dapat menjalankan aplikasi untuk memeriksa koneksi dan pengaturan.  

Jika ada kendala, silakan merujuk ke dokumentasi atau hubungi tim pengembang. 😊


### Backend
1. Masuk ke direktori `pergudangan-backend`.
2. Install dependencies dengan menjalankan `npm install` atau menggunakan package manager lain.
3. Jalankan server dengan `npm run start` atau `npm run start:watch`.

### Frontend
1. Masuk ke direktori `pergudangan-frontend`.
2. Install dependencies dengan menjalankan `npm install` atau menggunakan package manager lain.
3. Jalankan aplikasi frontend di development dengan `npm run dev`.

## Fitur

### Backend
- CRUD untuk data Batik, Kategori, Distributor, Supplier, Transaksi dan User.
- Autentikasi dan otorisasi menggunakan JWT Refresh Token.
- Logging aktivitas pengguna.

### Frontend
- Halaman login dan registrasi.
- Dashboard untuk melihat statistik dan data.
- Tabel data dengan fitur edit dan delete.
- Update profile user.
