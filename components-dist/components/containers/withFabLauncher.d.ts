import { FC } from 'react';

type WithFabLauncherType = {
    children: JSX.Element | FC;
    open: boolean;
};
declare const WithFabLauncher: FC<WithFabLauncherType>;
export default WithFabLauncher;
