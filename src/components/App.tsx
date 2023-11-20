import { Link, Outlet } from "react-router-dom";
import avatarPng from '@/assets/avatar2.png';
import avatarJpg from '@/assets/avatar.jpg';
import AvatarSvg from '@/assets/avatar3.svg';
import classnames from "@/components/App.module.scss";

const App = () => {
    return (
        <div data-testid="AppDataTestId">
            <nav>
                <ul>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/shop"}>Shop</Link>
                </ul>
            </nav>
            <h1>platform={__PLATFORM__}</h1>
            <img width={100} height={100} src={avatarPng} alt="drakon 1" />
            <img width={100} height={100} src={avatarJpg} alt="drakon 2" />
            <AvatarSvg fill={"green"} width={50} height={50} />
            <h1 className={classnames.header}>Hello world!</h1>
            <Outlet />
        </div>
    )
}

export default App;