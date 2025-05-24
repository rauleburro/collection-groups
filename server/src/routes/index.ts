import contentAPIRoutes from './content-api';
import groupRoutes from './group';

const routes = {
  'content-api': {
    type: 'content-api',
    routes: [...contentAPIRoutes, ...groupRoutes],
  },
};

export default routes;
