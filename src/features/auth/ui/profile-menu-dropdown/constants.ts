import { TMenuLinkProps } from './components/menu-link';

export const menuLinksLogout: TMenuLinkProps[] = [
    {
        id: '1',
        href: '/login',
        text: 'Войти',
        type: 'login',
    },
]

export const menuLinksLogin: TMenuLinkProps[] = [
    {
        id: '2',
        href: '/profile',
        text: 'Профиль',
        type: 'profile',
    },
    {
        id: '3',
        href: '/',
        text: 'Выйти',
        type: 'logout'
    },
]