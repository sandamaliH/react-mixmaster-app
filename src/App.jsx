import { About, HomeLayout, Landing, Error, Newsletter, Cocktail, SinglePageError } from "./Pages";
import { loader as landingLoader} from "./Pages/Landing";
import { loader as singleCocktailLoader} from "./Pages/Cocktail";
import { action as newsletterAction } from "./Pages/Newsletter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader,
      },
      {
        path: '/about',
        element: <About />,
        children: [
          {
            path: 'company',
            element: <h2>Our company</h2>,
          },
          {
            path: 'team',
            element: <h2>Our team</h2>,
          },
        ],
      },
      {
        path: '/cocktail/:id',
        errorElement: <SinglePageError />,
        element: <Cocktail />,
        loader: singleCocktailLoader(queryClient),
      },
      {
        path: '/newsletter',
        element: <Newsletter />,
        action: newsletterAction,
        errorElement: <SinglePageError />,
      },
    ]
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
