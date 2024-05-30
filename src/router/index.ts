import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/authStore"
import { pinia } from '@/stores';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LandingView.vue"),
    meta: {
      title: "QORGAN - Авторизация",
      layout: "AuthLayout",
    },
  },
  {
    path: "/",
    name: "cabinet",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Читатели",
      layout: "CabinetLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Профиль",
      layout: "ProfileLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
  },
  {
    path: "/books",
    name: "books",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Книги",
      layout: "BooksLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
  },
  {
    path: "/publishers",
    name: "publishers",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Издательство",
      layout: "PublisherLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Категории",
      layout: "CategoriesLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  },
  {
    path: "/groups",
    name: "groups",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Группы",
      layout: "GroupsLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  },
  {
    path: "/authors",
    name: "authors",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Группы",
      layout: "AuthorsLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  },
  {
    path: "/availabilitys",
    name: "availabilitys",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Группы",
      layout: "AvailabilityLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  },
  {
    path: "/movement",
    name: "movement",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Группы",
      layout: "MovementLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  },
  {
    path: "/eats-groups",
    name: "eats-groups",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Группы питания",
      layout: "EatsGroupsLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  },
  {
    path: "/eats-monitoring",
    name: "eats-monitoring",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Группы питания",
      layout: "EatsMonitoringLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  },
  {
    path: "/eats-terminal",
    name: "eats-terminal",
    component: () => import("@/views/CabinetView.vue"),
    meta: {
      title: "Группы питания",
      layout: "EatsTerminalLayout",
      requiresAuth: true, //! Необходима авторизация
      permissions: [], //! Необходимо перечислить разрешенные роли
    },
    
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

const authStore = useAuthStore(pinia)
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next("/login"); // Перенаправляем на страницу логина
  } else {
    next();
  }
});

export default router;
