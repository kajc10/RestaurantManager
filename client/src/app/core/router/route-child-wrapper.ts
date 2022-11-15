import { Route, Routes } from "@angular/router";
import { LayoutComponent } from "../layout/layout/layout.component";

/**
 * Creates routes using the shell component and authentication.
 * @param routes The routes to add.
 * @return The new route using shell as the base.
 */
 export function layoutChildRoutes(routes: Routes): Route {
    return {
        path: '',
        component: LayoutComponent,
        children: routes,
        // Reuse ShellComponent instance when navigating between child views
        data: { reuse: true },
    };
}
