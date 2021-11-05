import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Main from '../page/Main.vue';
import Report from '../page/Report.vue';
import Project from '../page/Project.vue';
import Todo from '../page/Todo.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/report',
    name: 'Report',
    component: Report,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
