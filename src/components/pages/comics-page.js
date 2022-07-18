import { Helmet } from "react-helmet";

import ComicsList from "../comics-list/comics-list";
import AppBanner from "../app-banner/app-banner";

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="comics page"
                    content="page with comics"
                    />
                <title>Comics data-base</title>
            </Helmet>
            <AppBanner/>    
            <ComicsList/>        
        </>
    )
}

export default ComicsPage;