import type { ComponentType, JSX } from 'react';
import { IndexPage } from '../pages/index-page';
import { LoginPage } from '../pages/login-page/login-page';
import { RegisterPage } from '../pages/register-page/register-page';
import { ChatPage } from '../pages/chat-page';

export type Route = {
    path: string;
    Component: ComponentType;
    title?: string;
    icon?: JSX.Element;
    children?: Route[]; // Добавлено свойство для вложенных маршрутов
}

export const routes: Route[] = [
    { path: '/', Component: IndexPage },
    { path: '/chats', Component: ChatPage },
    { path: '/register', Component: RegisterPage },
    { path: '/login', Component: LoginPage },
];