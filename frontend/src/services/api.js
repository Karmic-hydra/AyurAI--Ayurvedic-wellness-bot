import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add user ID to requests (simple session)
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      config.headers['x-user-id'] = userData.id;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear storage and redirect to login
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Chat API
export const chatAPI = {
  sendMessage: (data) => api.post('/chat/message', data),
  getHistory: (params) => api.get('/chat/history', { params }),
  getConsultation: (id) => api.get(`/chat/${id}`),
  submitFeedback: (id, feedback) => api.put(`/chat/${id}/feedback`, feedback),
  getSuggestions: () => api.get('/chat/suggestions'),
  getQuickPractice: () => api.get('/chat/quick-practice'),
};

// Profile API
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  getPrakriti: () => api.get('/profile/prakriti'),
  submitPrakriti: (data) => api.post('/profile/prakriti', data),
  generateWellnessCard: (data) => api.post('/profile/wellness-card', data),
};

// Articles API
export const articlesAPI = {
  getArticles: (params) => api.get('/articles', { params }),
  getArticle: (id) => api.get(`/articles/${id}`),
  getArticleBySlug: (slug) => api.get(`/articles/slug/${slug}`),
  getCategories: () => api.get('/articles/categories/list'),
  getRitu: () => api.get('/articles/reference/ritu'),
  getQuote: () => api.get('/articles/reference/quote'),
  getGlossary: () => api.get('/articles/reference/glossary'),
};

export default api;
