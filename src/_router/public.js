import MailClient from '../_view/public/routes/MailClient/MailClient'
import NotFound from '../_view/public/routes/NotFound/NotFound'

const publicRoutes = [{
  path: '/',
  name: 'mail-client',
  component: MailClient
}, {
  path: '/*',
  name: 'not-found',
  component: NotFound
}];

export default publicRoutes;
