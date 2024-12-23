import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: VITE_API_URL,
    withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response, // Response true just return it
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is 401 and the request is not a retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const response = await axiosInstance.post(
                    '/api/auth/refresh-token',
                    {}, // Empty body
                    { withCredentials: true } // Ensure cookies are sent
                );

                // Extract the new access token from the response
                const { accessToken } = response.data;

                // Save the new access token
                localStorage.setItem('accessToken', accessToken);

                // Retry the requess with the new access token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);

            } catch (error) {
                // If the refresh token fails, remove the access token
                console.error('Failed to refresh token:', error);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userImg')
                window.location.href = '/';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;