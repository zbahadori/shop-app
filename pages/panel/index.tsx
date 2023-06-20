
import UserPanelLayout from "@/app/components/userPanelLayout";
import { NextPageWithLayout } from "../_app";
import UserInfo from "@/app/components/panel/userInfo";

const Panel: NextPageWithLayout = () => {
    return (
        <div>
            <h1>
                User Dashboard
                <UserInfo />
            </h1>
        </div>
    )
}
Panel.getLayout = (page) => <UserPanelLayout>{page}</UserPanelLayout>

export default Panel;