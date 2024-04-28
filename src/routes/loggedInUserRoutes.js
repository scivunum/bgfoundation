import AppLayout from "../layouts/AppLayout/AppLayout";
import LandingPage from "../pages/home";
//import ProctorLiveEventPage from "../pages/ProctorLiveEventPage/ProctorLiveEventPage";

export const loggedInUserRoutes = [
    {
        route: '/',
        component: () => {
            return <AppLayout>
                <LandingPage />
            </AppLayout>
        }
    },
    //{
    //    route: '/live/:eventId',
    //    component: ProctorLiveEventPage,
    //},
    {
        route: '*',
        component: () => {
            return <>Page not found</>
        }
    },
]