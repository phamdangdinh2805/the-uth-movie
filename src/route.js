import Content from './pages/Home/Home';
import ViewMorePage from './pages/ViewMore/ViewMorePage';
import DetailsMovie from './pages/Details/Details';
import Search from './pages/Search/Search';
import SearchResults from './pages/Search/SearchResults';
import WatchTv from './pages/Watch/Watch';
import WatchMovie from './pages/Watch/WatchMovie';
import LoginPage from './pages/LoginPage/LoginPage';
import PersonalInfomation from './pages/PersonalInfo/PersonalInfo';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import AdminPage from './pages/Admin/Admin';
import UpgradeAccount from './pages/UpgradeAccount/UpgradeAccount'
import Success from './pages/UpgradeAccount/Success'
import Cancel from './pages/UpgradeAccount/Cancel'

export const routes = [
  {
    path: '/',
    element: Content,
  },
  {
    path: '/search',
    element: Search,
  },
  {
    path: '/login',
    element: LoginPage,
  },
  {
    path: '/results',
    element: SearchResults,
  },
  {
    path: '/:media_type/:type',
    element: ViewMorePage,
  },
  {
    path: '/details/:media_type/:id',
    element: DetailsMovie,
  },
  {
    path: '/watch/tv/:id/season/:season/esp/:esp',
    element: WatchTv,
  },
  {
    path: '/watch/movie/:id',
    element: WatchMovie,
  },
  {
    path: '/personal-infomation',
    element: PersonalInfomation,
  },
  {
    path: '/admin',
    element: LoginAdmin,
  },
  {
    path: '/adminpage',
    element: AdminPage,
  },
  {
    path: '/upgrade-account',
    element: UpgradeAccount,
  },
  {
    path: '/success',
    element: Success,
  },
  {
    path: '/cancel',
    element: Cancel,
  },
];
