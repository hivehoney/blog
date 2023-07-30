export default function RootRoutes() {
    return (
        <>
            <div id="sidebars">
                <h1>React Router</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        />
                    </form>
                    <form method="post">
                        <button type="submit">NEW</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href={`App/1`}>Name</a>
                        </li>
                        <li>
                            <a href={`App/2`}>Friend</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    )
};