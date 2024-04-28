import AppLayout from "../layouts/AppLayout/AppLayout";
import LandingPage from "../pages/home";

export const publicUserRoutes = [
    {
        route: '/',
        component: () => {
            return <AppLayout>
                <LandingPage companyname={'BGF Auction'} />
            </AppLayout>
        }
    },
    {
        route: '*',
        component: () => {
            return <>Page not found</>
        }
    },
]