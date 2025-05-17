import { useEffect, useState, useCallback } from 'react';
import { themeChange } from 'theme-change';
import { SunIcon } from '../icons/sun-icon';
import { MoonIcon } from '../icons/moon-icon';

export const ThemeToggle = () => {
    const [isChecked, setIsChecked] = useState<boolean>(() => {
        // Инициализируем состояние на основе значения из localStorage
        const localStorageTheme = localStorage.getItem('theme');
        return localStorageTheme ? localStorageTheme === 'light' : true;
    });

    useEffect(() => {
        themeChange(false); // Инициализация изменения темы

        // Устанавливаем атрибут data-theme на html для применения стилей
        const theme = isChecked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
    }, [isChecked]);

    const handlerSetIsChecked = useCallback(() => {
        // Переключаем тему и обновляем localStorage
        const newTheme = isChecked ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        setIsChecked(!isChecked);
    }, [isChecked]);

    return (
        <div className="form-control items-end text-neutral-content hover:text-white">
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    className="theme-controller"
                    id="ToggleTheme"
                    checked={isChecked}
                    data-toggle-theme="dark,light"
                    data-act-class="ACTIVECLASS"
                    onChange={handlerSetIsChecked}
                />
                <SunIcon />
                <MoonIcon />
            </label>
        </div>
    );
};