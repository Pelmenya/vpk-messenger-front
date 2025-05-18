import { TMenuLinkProps } from './components/menu-link';

export const menuLinksLogout: TMenuLinkProps[] = [
    {
        id: '1',
        href: '/login',
        text: 'enter',
        type: 'login',
    },
]

export const menuLinksLogin: TMenuLinkProps[] = [
    {
        id: '2',
        href: '/profile',
        text: 'profile',
        type: 'profile',
    },
    {
        id: '3',
        href: '/',
        text: 'exit',
        type: 'logout'
    },
]