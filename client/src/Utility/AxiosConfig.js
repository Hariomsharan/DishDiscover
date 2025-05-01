import axios from 'axios';

const instance = axios.create({
    baseURL:  import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Error response:", error.response);
        if (error.response.status === 440) {
            // Handle unauthorized access, e.g., redirect to login page
            localStorage.removeItem('token'); // Remove token from local storage
            window.location.href = '/'; // Redirect to login page
            console.error("Unauthorized access - redirecting to login");
        }
        return Promise.reject(error);
    }
)

export default instance;